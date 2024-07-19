import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicalRecordInfoDto, MedicalRecordDto } from 'src/app/commons/dto/medical-record';
import { MedicalRecordInfoReq } from 'src/app/commons/request/medical-record.req';
import { PrintMedicalRecordInfoComponent } from 'src/app/pages/staff/doctor/modal/print-medical-record-info/print-medical-record-info.component';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-patient-medical-record-info',
  templateUrl: './patient-medical-record-info.component.html',
  styleUrls: ['./patient-medical-record-info.component.scss']
})
export class PatientMedicalRecordInfoComponent implements OnInit {
  changeDataCheck: boolean = true;

  validateForm!: UntypedFormGroup;
  medicalRecordInfoReq: MedicalRecordInfoReq = new MedicalRecordInfoReq();
  medicalRecordInfoDto: MedicalRecordInfoDto = new MedicalRecordInfoDto();

  public Editor = ClassicEditor;

  medicalRecordId!: number;
  medicalRecordDto: MedicalRecordDto = new MedicalRecordDto()

  bmiValue!: number;

  constructor(
    private medicalRecordService: MedicalRecordService,
    private router: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.medicalRecordId = Number(url[url.length - 1]);
    this.validateForm = this.fb.group({
      weight: [null, [Validators.required]],
      height: [null, [Validators.required]],
      bodyTemperature: [null, [Validators.required]],
      heartbeat: [null, [Validators.required]],
      bloodPressure: [null, [Validators.required]],
      detailMedical: ["<p><b><i>Khám bệnh chi tiết!</i></b></p>", [Validators.required]],
      diagnose: [null, [Validators.required]],
      solution: [null, [Validators.required]],
    });
    this.getMedicalRecordById();
    this.getMedicalRecordInfo();
  }

  getMedicalRecordInfo(): void {
    this.medicalRecordService.getMedicalRecordInfo(this.medicalRecordId).subscribe(data => {
      this.medicalRecordInfoDto = data.data;
      this.validateForm = this.fb.group({
        weight: [this.medicalRecordInfoDto.weight, [Validators.required]],
        height: [this.medicalRecordInfoDto.height, [Validators.required]],
        bodyTemperature: [this.medicalRecordInfoDto.bodyTemperature, [Validators.required]],
        heartbeat: [this.medicalRecordInfoDto.heartbeat, [Validators.required]],
        bloodPressure: [this.medicalRecordInfoDto.bloodPressure, [Validators.required]],
        detailMedical: [this.medicalRecordInfoDto.detailMedical, [Validators.required]],
        diagnose: [this.medicalRecordInfoDto.diagnose, [Validators.required]],
        solution: [this.medicalRecordInfoDto.solution, [Validators.required]],
      });
      this.calculateBMI();
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

  onChangeWeight(): void {
    if (this.validateForm.value.weight != null && this.validateForm.value.height != null) {
      this.calculateBMI();
    }
  }

  calculateBMI(): void {
    let heightValue = this.validateForm.value.height / 100;
    this.bmiValue = this.validateForm.value.weight / (heightValue * heightValue)
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
      nzContent: PrintMedicalRecordInfoComponent,
      nzStyle: { top: '10px' },
      nzWidth: 850,
    });

    (<PrintMedicalRecordInfoComponent>modal.componentInstance).medicalRecordDto = this.medicalRecordDto;
    (<PrintMedicalRecordInfoComponent>modal.componentInstance).medicalRecordInfoDto = this.medicalRecordInfoDto;

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
        pdf.save('medical-record#' + this.medicalRecordId + '.pdf'); // Generated PDF   
      });
      if (unwantedElement != null) {
        unwantedElement.classList.remove('pdf-hidden'); // Xóa class mới
      }
    }
  }
}
