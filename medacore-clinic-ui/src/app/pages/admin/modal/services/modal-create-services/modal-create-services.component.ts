import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DepartmentDto } from 'src/app/commons/dto/department';
import { ServicesReq } from 'src/app/commons/request/services.req';
import { DepartmentService } from 'src/app/services/department.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-modal-create-services',
  templateUrl: './modal-create-services.component.html',
  styleUrls: ['./modal-create-services.component.scss']
})
export class ModalCreateServicesComponent implements OnInit {
  servicesReq: ServicesReq = new ServicesReq();
  validateForm!: UntypedFormGroup;

  listDepartment: DepartmentDto[] = []

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private servicesService: ServicesService,
    private departmentService: DepartmentService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      price: [null, [Validators.required]],
      departmentId: [null, [Validators.required]],
    });
    this.getListDepartment();
  }

  destroyModal(): void {
    this.modal.close();
  }

  getListDepartment(): void {
    this.departmentService.getAllDepartment().subscribe(data => {
      this.listDepartment = data.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  createServices(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.servicesReq = {
        name: this.validateForm.value.name,
        description: this.validateForm.value.description,
        price: this.validateForm.value.price,
        departmentId: this.validateForm.value.departmentId,
      }
      this.servicesService.createServices(this.servicesReq).subscribe(data => {
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
