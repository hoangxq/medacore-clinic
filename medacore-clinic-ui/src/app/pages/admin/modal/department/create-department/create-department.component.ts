import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DepartmentReq } from 'src/app/commons/request/department.req';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit {
  departmentReq: DepartmentReq = new DepartmentReq();
  validateForm!: UntypedFormGroup;

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
  }

  destroyModal(): void {
    this.modal.close();
  }

  createDepartment(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.departmentReq = {
        name: this.validateForm.value.name,
        description: this.validateForm.value.description,
      }
      this.departmentService.createDepartment(this.departmentReq).subscribe(data => {
        this.destroyModal();
      }, error => {
        this.notification.create(
          'error',
          'Lỗi máy chủ',
          'Có lỗi xảy ra vui lòng thử lại sau'
        );
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
