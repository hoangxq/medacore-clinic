import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DepartmentDto } from 'src/app/commons/dto/department';
import { MedicalRecordDto } from 'src/app/commons/dto/medical-record';
import { ServicesOfMedicalTestDto } from 'src/app/commons/dto/medical-test';
import { ServicesDto } from 'src/app/commons/dto/services';
import { MedicalTestReq, ServicesOfMedicalTestReq } from 'src/app/commons/request/medical-test.req';
import { PrintMedicalTestComponent } from 'src/app/pages/staff/doctor/modal/print-medical-test/print-medical-test.component';
import { DepartmentService } from 'src/app/services/department.service';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { MedicalTestService } from 'src/app/services/medical-test.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-patient-specify-cls',
  templateUrl: './patient-specify-cls.component.html',
  styleUrls: ['./patient-specify-cls.component.scss']
})
export class PatientSpecifyClsComponent implements OnInit {
  changeDataCheck: boolean = true;

  listServiceOfTestReq: ServicesOfMedicalTestReq[] = [];
  medicalTestReq: MedicalTestReq = new MedicalTestReq();

  total = 1;
  listServicesData: ServicesOfMedicalTestDto[] = [];
  loading = false;
  pageSize = 10;
  pageIndex = 1;

  searchValue = '';
  visible = false;

  // init data
  validateForm!: UntypedFormGroup;

  medicalRecordId!: number;
  medicalRecordDto: MedicalRecordDto = new MedicalRecordDto()

  listDepartments: DepartmentDto[] = [];
  listServices: ServicesDto[] = []

  fixPrice: string = "Đơn giá";

  constructor(
    private medicalRecordService: MedicalRecordService,
    private router: Router,
    private notification: NzNotificationService,
    private fb: UntypedFormBuilder,
    private servicesService: ServicesService,
    private departmentService: DepartmentService,
    private modalService: NzModalService,
    private medicalTestService: MedicalTestService
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.medicalRecordId = Number(url[url.length - 1]);
    this.getMedicalRecordById();
    this.getMedicalTest();
    this.validateForm = this.fb.group({
      departmentId: [null],
      serviceId: [null, [Validators.required]],
      quantity: [1, [Validators.required]],
      note: [null],
    });
  }

  getMedicalTest(): void {
    this.medicalTestService.getByMedicalRecord(this.medicalRecordId).subscribe(data => {
      console.log(data)
      this.listServicesData = data.data.services;
      console.log(this.listServicesData[0].serviceDto)
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
      nzContent: PrintMedicalTestComponent,
      nzStyle: { top: '10px' },
      nzWidth: 850,
    });

    (<PrintMedicalTestComponent>modal.componentInstance).medicalRecordDto = this.medicalRecordDto;
    (<PrintMedicalTestComponent>modal.componentInstance).listServiceOfMedicalTestDto = this.listServicesData;

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
        pdf.save('specify-cls#' + this.medicalRecordId + '.pdf'); // Generated PDF   
      });
      if (unwantedElement != null) {
        unwantedElement.classList.remove('pdf-hidden'); // Xóa class mới
      }
    }
  }
}
