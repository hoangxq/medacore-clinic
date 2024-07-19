import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DepartmentDto } from 'src/app/commons/dto/department';
import { DepartmentReq } from 'src/app/commons/request/department.req';
import { DepartmentService } from './../../../../../services/department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.scss']
})
export class UpdateDepartmentComponent implements OnInit {
  @Input() departmentId!: number;

  departmentReq: DepartmentReq = new DepartmentReq();
  validateForm!: UntypedFormGroup;
  departmentDto: DepartmentDto = new DepartmentDto();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private departmentService: DepartmentService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
    });
    this.getDepartmentById();
  }

  getDepartmentById(): void {
    this.departmentService.getDepartmentById(this.departmentId).subscribe(data => {
      this.departmentReq = data.data;

      this.validateForm = this.fb.group({
        name: [this.departmentReq.name, [Validators.required]],
        description: [this.departmentReq.description],
      });
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  destroyModal(): void {
    this.modal.close();
  }

  updateDepartment(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.departmentReq = {
        name: this.validateForm.value.name,
        description: this.validateForm.value.description,
      }
      this.departmentService.updateDepartment(this.departmentId, this.departmentReq).subscribe(data => {
        this.destroyModal();
      }, error => {
        console.log(error)
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
