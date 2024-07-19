import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicalRecordDto } from 'src/app/commons/dto/medical-record';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { PrintMedicalRecordInfoComponent } from '../modal/print-medical-record-info/print-medical-record-info.component';
import { MedicalRecordInfoDto } from './../../../../commons/dto/medical-record';
import { MedicalRecordInfoReq } from './../../../../commons/request/medical-record.req';
import { MedicalExamTemplateService } from 'src/app/services/medical-exam-template.service';
import { MedicalExamTemplateDto } from 'src/app/commons/dto/medical-exam-template';

@Component({
  selector: 'app-create-medical-examination',
  templateUrl: './create-medical-examination.component.html',
  styleUrls: ['./create-medical-examination.component.scss']
})
export class CreateMedicalExaminationComponent implements OnInit {
  changeDataCheck: boolean = true;

  validateForm!: UntypedFormGroup;
  medicalRecordInfoReq: MedicalRecordInfoReq = new MedicalRecordInfoReq();
  medicalRecordInfoDto: MedicalRecordInfoDto = new MedicalRecordInfoDto();

  public Editor = ClassicEditor;

  medicalRecordId!: number;
  medicalRecordDto: MedicalRecordDto = new MedicalRecordDto()

  bmiValue!: number;
  
  listTemplate: MedicalExamTemplateDto[] = [];
  description: string = "<p><b><i>Chi tiết phiếu khám!</i></b></p>";

  constructor(
    private medicalRecordService: MedicalRecordService,
    private router: Router,
    private modalService: NzModalService,
    private templateService: MedicalExamTemplateService,
    private notification: NzNotificationService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.getListTemplate();
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
      templateId: [null],
    });
    this.getMedicalRecordById();
    this.getMedicalRecordInfo();
  }

  getListTemplate(): void {
    this.templateService.getTemplatesCommon().subscribe(data => {
      this.listTemplate = data.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
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
        templateId: [null],
      });
      this.description = this.medicalRecordInfoDto.detailMedical;
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

  saveInfo(): void {
    // console.log('submit', this.validateForm.value);
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.medicalRecordInfoReq = {
        weight: this.validateForm.value.weight,
        height: this.validateForm.value.height,
        bodyTemperature: this.validateForm.value.bodyTemperature,
        heartbeat: this.validateForm.value.heartbeat,
        bloodPressure: this.validateForm.value.bloodPressure,
        detailMedical: this.description,
        diagnose: this.validateForm.value.diagnose,
        solution: this.validateForm.value.solution,
        medicalRecordId: this.medicalRecordId,
      }
      this.medicalRecordService.createMedicalRecordInfo(this.medicalRecordInfoReq).subscribe(data => {
        this.notification.create(
          'info',
          'Lưu dữ liệu',
          'Đã lưu thông tin khám bệnh'
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

  onChangeTemplate(templateId: number): void {
    let indexExist = this.listTemplate.findIndex(e => e.id == templateId);
    this.description = this.listTemplate[indexExist].description;
  }
}
