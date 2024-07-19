import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DepartmentDto } from 'src/app/commons/dto/department';
import { ServicesDto } from 'src/app/commons/dto/services';
import { ServicesReq } from 'src/app/commons/request/services.req';
import { DepartmentService } from 'src/app/services/department.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-modal-update-services',
  templateUrl: './modal-update-services.component.html',
  styleUrls: ['./modal-update-services.component.scss']
})
export class ModalUpdateServicesComponent implements OnInit {
  @Input() servicesId!: number;

  servicesReq: ServicesReq = new ServicesReq();
  validateForm!: UntypedFormGroup;
  servicesDto: ServicesDto = new ServicesDto();

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
    this.getServicesById();
    this.getListDepartment();
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

  getServicesById(): void {
    this.servicesService.getServicesById(this.servicesId).subscribe(data => {
      this.servicesDto = data.data;

      this.validateForm = this.fb.group({
        name: [this.servicesDto.name, [Validators.required]],
        useManual: [this.servicesDto.description],
        price: [this.servicesDto.price, [Validators.required]],
        departmentId: [this.servicesDto.department.id, [Validators.required]],
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

  updateServices(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.servicesReq = {
        name: this.validateForm.value.name,
        description: this.validateForm.value.description,
        price: this.validateForm.value.price,
        departmentId: this.validateForm.value.departmentId,
      }
      this.servicesService.updateServices(this.servicesId, this.servicesReq).subscribe(data => {
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
