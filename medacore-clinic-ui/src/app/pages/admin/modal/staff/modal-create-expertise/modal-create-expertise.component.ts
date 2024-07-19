import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ExpertiseReq } from 'src/app/commons/request/position-expertise.req';
import { ExpertiseService } from 'src/app/services/expertise.service';

@Component({
  selector: 'app-modal-create-expertise',
  templateUrl: './modal-create-expertise.component.html',
  styleUrls: ['./modal-create-expertise.component.scss']
})
export class ModalCreateExpertiseComponent implements OnInit {
  expertiseReq: ExpertiseReq = new ExpertiseReq();
  validateForm!: UntypedFormGroup;

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private expertiseService: ExpertiseService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
    });
  }

  destroyModal(): void {
    this.modal.close();
  }

  createExpertise(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.expertiseReq = {
        name: this.validateForm.value.name,
        description: this.validateForm.value.description,
      }
      this.expertiseService.createExpertise(this.expertiseReq).subscribe(data => {
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
