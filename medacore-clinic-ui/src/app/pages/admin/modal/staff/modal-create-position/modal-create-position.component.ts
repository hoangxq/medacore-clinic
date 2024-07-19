import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PositionReq } from 'src/app/commons/request/position-expertise.req';
import { PositionService } from './../../../../../services/position.service';

@Component({
  selector: 'app-modal-create-position',
  templateUrl: './modal-create-position.component.html',
  styleUrls: ['./modal-create-position.component.scss']
})
export class ModalCreatePositionComponent implements OnInit {
  positionReq: PositionReq = new PositionReq();
  validateForm!: UntypedFormGroup;

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private positionService: PositionService,
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

  createPosition(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.positionReq = {
        name: this.validateForm.value.name,
        description: this.validateForm.value.description,
      }
      this.positionService.createPosition(this.positionReq).subscribe(data => {
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
