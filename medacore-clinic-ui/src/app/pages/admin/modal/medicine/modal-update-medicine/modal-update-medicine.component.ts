import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicineDto } from 'src/app/commons/dto/medicine';
import { MedicineReq } from 'src/app/commons/request/medicines.req';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-modal-update-medicine',
  templateUrl: './modal-update-medicine.component.html',
  styleUrls: ['./modal-update-medicine.component.scss']
})
export class ModalUpdateMedicineComponent implements OnInit {
  @Input() medicineId!: number;

  medicineReq: MedicineReq = new MedicineReq();
  validateForm!: UntypedFormGroup;
  medicineDto: MedicineDto = new MedicineDto();

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
    this.getMedicineById();
  }

  getMedicineById(): void {
    this.medicineService.getMedicineById(this.medicineId).subscribe(data => {
      this.medicineDto = data.data;

      this.validateForm = this.fb.group({
        name: [this.medicineDto.name, [Validators.required]],
        useManual: [this.medicineDto.useManual],
        unit: [this.medicineDto.unit, [Validators.required]],
        quantity: [this.medicineDto.quantity, [Validators.required]],
        price: [this.medicineDto.price, [Validators.required]],
        activeElement: [this.medicineDto.activeElement, [Validators.required]],
        content: [this.medicineDto.content, [Validators.required]],
        using: [this.medicineDto.using, [Validators.required]],
        packing: [this.medicineDto.packing, [Validators.required]],
        productionUnit: [this.medicineDto.productionUnit, [Validators.required]],
        declaringUnit: [this.medicineDto.declaringUnit, [Validators.required]],
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

  updateMedicine(): void {
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
      this.medicineService.updateMedicine(this.medicineId, this.medicineReq).subscribe(data => {
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
