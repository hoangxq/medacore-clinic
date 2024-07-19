import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicalExamTemplateDto } from 'src/app/commons/dto/medical-exam-template';
import { ModalCreateMedicalExamTemplateComponent } from 'src/app/components/modal/modal-create-medical-exam-template/modal-create-medical-exam-template.component';
import { ModalUpdateMedicalExamTemplateComponent } from 'src/app/components/modal/modal-update-medical-exam-template/modal-update-medical-exam-template.component';
import { MedicalExamTemplateService } from 'src/app/services/medical-exam-template.service';

@Component({
  selector: 'app-admin-medical-exam-template',
  templateUrl: './admin-medical-exam-template.component.html',
  styleUrls: ['./admin-medical-exam-template.component.scss']
})
export class AdminMedicalExamTemplateComponent {
  total = 1;
  listTemplate: MedicalExamTemplateDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchValue = '';
  visible = false;

  constructor(
    private templateService: MedicalExamTemplateService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListTemplate();
  }

  getListTemplate(): void {
    this.templateService.getTemplatesCommon().subscribe(data => {
      this.listTemplate = data.data;
      this.listOfDisplayData = this.listTemplate;
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  showModalCreateTemplate(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới Thuốc',
      nzContent: ModalCreateMedicalExamTemplateComponent,
      nzWidth: 750,
    });
    (<ModalCreateMedicalExamTemplateComponent>modal.componentInstance).doctorUsername = "admin";
    modal.afterClose.subscribe(() => this.getListTemplate())
  }

  editTemplate(templateId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật thuốc',
      nzContent: ModalUpdateMedicalExamTemplateComponent,
      nzWidth: 750,
      nzComponentParams: {
        templateId
      }
    });
    modal.afterClose.subscribe(() => this.getListTemplate())
  }

  removeTemplate(templateId: number): void {
    this.templateService.removeTemplate(templateId).subscribe(data => {
      this.getListTemplate();
      this.notification.create(
        'success',
        'Thông báo',
        'Xóa thành công mẫu phiếu khám'
      );
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }
}
