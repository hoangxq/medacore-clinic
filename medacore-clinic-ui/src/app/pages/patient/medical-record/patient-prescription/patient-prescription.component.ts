import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
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
import { PrintMedicineComponent } from 'src/app/pages/staff/doctor/modal/print-medicine/print-medicine.component';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { PrescriptionService } from 'src/app/services/prescription.service';

@Component({
  selector: 'app-patient-prescription',
  templateUrl: './patient-prescription.component.html',
  styleUrls: ['./patient-prescription.component.scss']
})
export class PatientPrescriptionComponent  implements OnInit {
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
    private modalService: NzModalService,
    private prescriptionService: PrescriptionService,
    private medicineService: MedicineService
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.medicalRecordId = Number(url[url.length - 1]);
    this.getMedicalRecordById();
    this.getPrescription();
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
      let unwantedElement = data.querySelector('#no-print');
      if (unwantedElement != null) {
        unwantedElement.classList.add('pdf-hidden'); // Thêm class mới
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
        unwantedElement.classList.remove('pdf-hidden'); // Xóa class mới
      }
    }
  }
}
