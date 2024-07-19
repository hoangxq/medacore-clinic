import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicineReq } from 'src/app/commons/request/medicines.req';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-modal-create-medicine',
  templateUrl: './modal-create-medicine.component.html',
  styleUrls: ['./modal-create-medicine.component.scss']
})
export class ModalCreateMedicineComponent implements OnInit {
  medicineReq: MedicineReq = new MedicineReq();
  validateForm!: UntypedFormGroup;

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private medicineService: MedicineService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      useManual: [null, [Validators.required]],
      unit: [null, [Validators.required]],
      // quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      activeElement: [null, [Validators.required]],
      content: [null, [Validators.required]],
      using: [null, [Validators.required]],
      packing: [null, [Validators.required]],
      productionUnit: [null, [Validators.required]],
      declaringUnit: [null, [Validators.required]],
    });
  }

  destroyModal(): void {
    this.modal.close();
  }

  createMedicine(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.medicineReq = {
        name: this.validateForm.value.name,
        useManual: this.validateForm.value.useManual,
        unit: this.validateForm.value.unit,
        quantity: this.validateForm.value.quantity,
        price: this.validateForm.value.price,
        activeElement: this.validateForm.value.activeElement,
        content: this.validateForm.value.content,
        using: this.validateForm.value.using,
        packing: this.validateForm.value.packing,
        productionUnit: this.validateForm.value.productionUnit,
        declaringUnit: this.validateForm.value.declaringUnit,
      }
      this.medicineService.createMedicine(this.medicineReq).subscribe(data => {
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
