import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PositionDto } from 'src/app/commons/dto/position-expertise';
import { PositionReq } from 'src/app/commons/request/position-expertise.req';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-modal-update-position',
  templateUrl: './modal-update-position.component.html',
  styleUrls: ['./modal-update-position.component.scss']
})
export class ModalUpdatePositionComponent implements OnInit {
  @Input() positionId!: number;

  positionReq: PositionReq = new PositionReq();
  validateForm!: UntypedFormGroup;
  positionDto: PositionDto = new PositionDto();

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
    this.getPositionById();
  }

  getPositionById(): void {
    this.positionService.getPositionById(this.positionId).subscribe(data => {
      this.positionDto = data.data;

      this.validateForm = this.fb.group({
        name: [this.positionDto.name, [Validators.required]],
        description: [this.positionDto.description],
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

  updatePosition(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.positionReq = {
        name: this.validateForm.value.name,
        description: this.validateForm.value.description,
      }
      this.positionService.updatePosition(this.positionId, this.positionReq).subscribe(data => {
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
