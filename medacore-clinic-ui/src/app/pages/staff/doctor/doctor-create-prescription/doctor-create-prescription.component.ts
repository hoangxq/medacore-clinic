import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicalRecordDto } from 'src/app/commons/dto/medical-record';
import { MedicineDto } from 'src/app/commons/dto/medicine';
import { MedicineOfPrescriptionDto } from 'src/app/commons/dto/prescription';
import { MedicineCriteria } from 'src/app/commons/request/medicines.req';
import { MedicineOdPrescriptionReq, PrescriptionReq } from 'src/app/commons/request/prescription.req';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { PrintPaymentModalComponent } from '../../nursing/modal/print-payment-modal/print-payment-modal.component';
import { PrintMedicineComponent } from '../modal/print-medicine/print-medicine.component';

@Component({
  selector: 'app-doctor-create-prescription',
  templateUrl: './doctor-create-prescription.component.html',
  styleUrls: ['./doctor-create-prescription.component.scss']
})
export class DoctorCreatePrescriptionComponent implements OnInit {
  changeDataCheck: boolean = true;

  listMedicinesReq: MedicineOdPrescriptionReq[] = [];
  prescriptionReq: PrescriptionReq = new PrescriptionReq();

  total = 1;
  listMedicinesData: MedicineOfPrescriptionDto[] = [];
  loading = false;
  pageSize = 10;
  pageIndex = 1;

  searchValue = '';
  visible = false;

  // init data
  validateForm!: UntypedFormGroup;

  medicalRecordId!: number;
  medicalRecordDto: MedicalRecordDto = new MedicalRecordDto()

  listMedicines: MedicineDto[] = []

  fixPrice: string = "Đơn giá";

  constructor(
    private medicalRecordService: MedicalRecordService,
    private router: Router,
    private notification: NzNotificationService,
    private fb: UntypedFormBuilder,
    private prescriptionService: PrescriptionService,
    private modalService: NzModalService,
    private medicineService: MedicineService
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.medicalRecordId = Number(url[url.length - 1]);
    this.getMedicalRecordById();
    this.getPrescription();
    this.getAllMedicines();
    this.validateForm = this.fb.group({
      medicineId: [null, [Validators.required]],
      quantity: [1, [Validators.required]],
      note: [null],
    });
  }

  getPrescription(): void {
    this.prescriptionService.getPrescriptionOfMedicalRecord(this.medicalRecordId).subscribe(data => {
      this.listMedicinesData = data.data.medicines;
    }, error => {
      console.log(error)
    })
  }

  getMedicalRecordById(): void {
    this.medicalRecordService.getMedicalRecordById(this.medicalRecordId).subscribe(data => {
      this.medicalRecordDto = data.data;
      if (this.medicalRecordDto.status == "DONE") this.changeDataCheck = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  getAllMedicines(): void {
    this.medicineService.getAllMedicine(new MedicineCriteria()).subscribe(data => {
      this.listMedicines = data.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  onChangeMedicine(medicineId: number): void {
    let indexExist = this.listMedicines.findIndex(e => e.id == medicineId);
    let price = this.listMedicines[indexExist].price;
    this.fixPrice = price.toLocaleString().replaceAll(",", ".") + ' đ';
  }

  addMedicines(): void {
    if (this.validateForm.valid) {
      let indexExist = this.listMedicinesData.findIndex(e => e.medicineDto.id == this.validateForm.value.medicineId);

      if (indexExist == -1) {
        let indexMedicine: number = this.listMedicines.findIndex(e => e.id == this.validateForm.value.medicineId);
        let medicine: MedicineDto = this.listMedicines[indexMedicine];
        let medicinesData: MedicineOfPrescriptionDto = {
          id: -1,
          medicineDto: medicine,
          quantity: this.validateForm.value.quantity,
          note: this.validateForm.value.note
        }
        this.listMedicinesData.push(medicinesData)
      } else {
        this.listMedicinesData[indexExist].quantity += this.validateForm.value.quantity
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  removeMedicine(medicineId: number): void {
    let index = this.listMedicinesData.findIndex(e => e.medicineDto.id == medicineId)
    this.listMedicinesData.splice(index, 1);
  }

  saveInfo(): void {
    if (this.validateForm.valid) {
      this.listMedicinesData.forEach(e =>
        this.listMedicinesReq.push({
          medicineId: e.medicineDto.id,
          quantity: e.quantity
        }))
      this.prescriptionReq = {
        medicalRecordId: this.medicalRecordId,
        medicinesReq: this.listMedicinesReq
      }
      this.prescriptionService.createPrescription(this.prescriptionReq).subscribe(data => {
        this.notification.create(
          'info',
          'Lưu dữ liệu',
          'Đã lưu thông tin đơn thuốc'
        );
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

  // onPrint(): void {
  //   let data = document.getElementById('pdfContent');
  //   if (data != null) {
  //     let unwantedElement = data.querySelector('#no-print');
  //     if (unwantedElement != null) {
  //       unwantedElement.classList.add('pdf-hidden'); // Thêm class mới
  //     }
  //     window.print();
  //     if (unwantedElement != null) {
  //       unwantedElement.classList.remove('pdf-hidden'); // Xóa class mới
  //     }
  //   }
  // }

  onPrint(): void {
    const modal = this.modalService.create({
      // nzTitle: 'Hóa đơn',
      nzContent: PrintMedicineComponent,
      nzStyle: { top: '10px' },
      nzWidth: 850,
    });

    (<PrintMedicineComponent>modal.componentInstance).medicalRecordDto = this.medicalRecordDto;
    (<PrintMedicineComponent>modal.componentInstance).listMedicines = this.listMedicinesData;
    
    // let data = document.getElementById('pdfContent');
    // if (data != null) {
    //   let unwantedElement = data.querySelector('#no-print');
    //   if (unwantedElement != null) {
    //     unwantedElement.classList.add('pdf-hidden'); // Thêm class mới
    //   }
    //   window.print();
    //   if (unwantedElement != null) {
    //     unwantedElement.classList.remove('pdf-hidden'); // Xóa class mới
    //   }
    // }
  }

  onGeneratePdf(): void {
    let data = document.getElementById('pdfContent');
    if (data != null) {
      let unwantedElement = data.querySelectorAll('.no-print');
      if (unwantedElement != null) {
        unwantedElement.forEach(e => e.classList.add('pdf-hidden')); // Thêm class mới
      }
      html2canvas(data).then(canvas => {
        // Few necessary setting options  
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('prescription#' + this.medicalRecordId + '.pdf'); // Generated PDF   
      });
      if (unwantedElement != null) {
        unwantedElement.forEach(e => e.classList.remove('pdf-hidden')); // Xóa class mới
      }
    }
  }
}
