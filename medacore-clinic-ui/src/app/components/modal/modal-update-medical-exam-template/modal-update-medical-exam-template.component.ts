import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicalExamTemplateDto, MedicalExamTemplateReq } from 'src/app/commons/dto/medical-exam-template';
import { MedicalExamTemplateService } from 'src/app/services/medical-exam-template.service';

@Component({
  selector: 'app-modal-update-medical-exam-template',
  templateUrl: './modal-update-medical-exam-template.component.html',
  styleUrls: ['./modal-update-medical-exam-template.component.scss']
})
export class ModalUpdateMedicalExamTemplateComponent implements OnInit {
  @Input() templateId!: number;

  templateReq: MedicalExamTemplateReq = new MedicalExamTemplateReq();
  validateForm!: UntypedFormGroup;
  template: MedicalExamTemplateDto = new MedicalExamTemplateDto();
  listTemplate: MedicalExamTemplateDto[] = [];
  
  public Editor = ClassicEditor;
  description: string = "<p><b><i>Chi tiết phiếu khám!</i></b></p>";

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private templateService: MedicalExamTemplateService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      templateId: [null],
      description: ["<p><b><i>Chi tiết phiếu khám!</i></b></p>", [Validators.required]],
    });
    this.getListTemplate();
    this.getTemplateById();
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

  getTemplateById(): void {
    this.templateService.getTemplateById(this.templateId).subscribe(data => {
      this.template = data.data;

      this.validateForm = this.fb.group({
        name: [this.template.name, [Validators.required]],
        templateId: [null],
        description: [this.template.description, [Validators.required]],
      });

      this.description = this.template.description;
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

  updateTemplate(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.templateReq = {
        name: this.validateForm.value.name,
        description: this.description
      }
      this.templateService.updateTemplate(this.templateId, this.templateReq).subscribe(data => {
        this.notification.create(
          'success',
          'Thông báo',
          'Cập nhật mẫu phiếu khám thành công'
        );
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

  onChangeTemplate(templateId: number): void {
    let indexExist = this.listTemplate.findIndex(e => e.id == templateId);
    this.description = this.listTemplate[indexExist].description;
  }
}
