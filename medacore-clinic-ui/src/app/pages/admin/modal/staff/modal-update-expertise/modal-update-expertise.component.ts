import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ExpertiseReq } from 'src/app/commons/request/position-expertise.req';
import { ExpertiseService } from 'src/app/services/expertise.service';
import { ExpertiseDto } from './../../../../../commons/dto/position-expertise';

@Component({
  selector: 'app-modal-update-expertise',
  templateUrl: './modal-update-expertise.component.html',
  styleUrls: ['./modal-update-expertise.component.scss']
})
export class ModalUpdateExpertiseComponent implements OnInit {
  @Input() expertiseId!: number;

  expertiseReq: ExpertiseReq = new ExpertiseReq();
  validateForm!: UntypedFormGroup;
  expertiseDto: ExpertiseDto = new ExpertiseDto();

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
    this.getExpertiseById();
  }

  getExpertiseById(): void {
    this.expertiseService.getExpertiseById(this.expertiseId).subscribe(data => {
      this.expertiseDto = data.data;

      this.validateForm = this.fb.group({
        name: [this.expertiseDto.name, [Validators.required]],
        description: [this.expertiseDto.description],
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

  updateExpertise(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.expertiseReq = {
        name: this.validateForm.value.name,
        description: this.validateForm.value.description,
      }
      this.expertiseService.updateExpertise(this.expertiseId, this.expertiseReq).subscribe(data => {
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
