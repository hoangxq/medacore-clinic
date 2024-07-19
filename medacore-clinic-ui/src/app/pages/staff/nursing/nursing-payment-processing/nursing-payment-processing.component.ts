import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicalRecordDto } from 'src/app/commons/dto/medical-record';
import { ServicesOfMedicalTestDto } from 'src/app/commons/dto/medical-test';
import { MedicineOfPrescriptionDto } from 'src/app/commons/dto/prescription';
import { MedicalTestReq, ServicesOfMedicalTestReq } from 'src/app/commons/request/medical-test.req';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { MedicalTestService } from 'src/app/services/medical-test.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { PrintPaymentModalComponent } from '../modal/print-payment-modal/print-payment-modal.component';

@Component({
  selector: 'app-nursing-payment-processing',
  templateUrl: './nursing-payment-processing.component.html',
  styleUrls: ['./nursing-payment-processing.component.scss']
})
export class NursingPaymentProcessingComponent implements OnInit {

  medicalRecordId!: number;
  medicalRecordDto: MedicalRecordDto = new MedicalRecordDto();

  totalCLSPrice: number = 0;
  totalPresPrice: number = 0;
  totalPrice: number = 200000;

  dataTableFake: number[] = [1, 2, 3]

  changeDataCheck: boolean = true;

  listServiceOfTestReq: ServicesOfMedicalTestReq[] = [];
  medicalTestReq: MedicalTestReq = new MedicalTestReq();

  total = 1;
  listServicesData: ServicesOfMedicalTestDto[] = [];
  loading = false;
  pageSize = 10;
  pageIndex = 1;

  // prescription

  totalPres = 1;
  listMedicinesData: MedicineOfPrescriptionDto[] = [];
  loadingPres = false;
  pageSizePres = 10;
  pageIndexPres = 1;

  constructor(
    private medicalRecordService: MedicalRecordService,
    private router: Router,
    private notification: NzNotificationService,
    private fb: UntypedFormBuilder,
    private medicalTestService: MedicalTestService,
    private modalService: NzModalService,
    private prescriptionService: PrescriptionService,
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.medicalRecordId = Number(url[url.length - 1]);
    this.getMedicalRecordById();
    this.getMedicalTest();
    this.getPrescription();
  }

  getMedicalTest(): void {
    this.medicalTestService.getByMedicalRecord(this.medicalRecordId).subscribe(data => {
      this.listServicesData = data.data.services;
      this.listServicesData.forEach(e => this.totalCLSPrice += e.serviceDto.price * e.quantity)
      this.totalPrice += this.totalCLSPrice
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

  getPrescription(): void {
    this.prescriptionService.getPrescriptionOfMedicalRecord(this.medicalRecordId).subscribe(data => {
      this.listMedicinesData = data.data.medicines;
      this.listMedicinesData.forEach(e => this.totalPresPrice += e.medicineDto.price * e.quantity)
      this.totalPrice += this.totalPresPrice
    }, error => {
      console.log(error)
    })
  }

  acceptPayment(): void {
    this.medicalRecordService.updatePaymentStatus(this.medicalRecordId, "PAID").subscribe(data => {
      this.getMedicalRecordById();
      this.notification.create(
        'success',
        'Thanh toán',
        'Xác nhận thanh toán cho ca khám thành cồn'
      );
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  onPrint(): void {
    const modal = this.modalService.create({
      // nzTitle: 'Hóa đơn',
      nzContent: PrintPaymentModalComponent,
      nzStyle: { top: '10px' },
      nzWidth: 850,
    });

    (<PrintPaymentModalComponent>modal.componentInstance).medicalRecordDto = this.medicalRecordDto;
    (<PrintPaymentModalComponent>modal.componentInstance).listMedicines = this.listMedicinesData;
    (<PrintPaymentModalComponent>modal.componentInstance).listServiceOfMedicalTestDto = this.listServicesData;

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
        pdf.save('bill#' + this.medicalRecordId + '.pdf'); // Generated PDF   
      });
      if (unwantedElement != null) {
        unwantedElement.classList.remove('pdf-hidden'); // Xóa class mới
      }
    }
  }
}
