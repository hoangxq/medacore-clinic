import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ExpertiseDto, PositionDto } from 'src/app/commons/dto/position-expertise';
import { StaffDto } from 'src/app/commons/dto/staff';
import { StaffReq } from 'src/app/commons/request/staff.req';
import { ExpertiseService } from 'src/app/services/expertise.service';
import { PositionService } from 'src/app/services/position.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-update-staff',
  templateUrl: './modal-update-staff.component.html',
  styleUrls: ['./modal-update-staff.component.scss']
})
export class ModalUpdateStaffComponent implements OnInit {
  @Input() staffId!: number;

  staffReq: StaffReq = new StaffReq();
  validateForm!: UntypedFormGroup;
  staffDto: StaffDto = new StaffDto();

  listPosition: PositionDto[] = [];
  listExpertise: ExpertiseDto[] = [];

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private notification: NzNotificationService,
    private positionService: PositionService,
    private expertiseService: ExpertiseService,
  ) { }

  ngOnInit(): void {
    this.getListExpertise();
    this.getListPosition();
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      ethnic: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      job: [null],
      gender: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      detailAddress: [null, [Validators.required]],
      expertiseId: [null, [Validators.required]],
      positionId: [null, [Validators.required]],
      description: [null],
    });
    this.getStaffById();
  }

  getListPosition(): void {
    this.positionService.getAllPosition().subscribe(data => {
      this.listPosition = data.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  getListExpertise(): void {
    this.expertiseService.getAllExpertise().subscribe(data => {
      this.listExpertise = data.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  getStaffById(): void {
    this.userService.getStaff(this.staffId).subscribe(data => {
      this.staffDto = data.data;

      this.validateForm = this.fb.group({
        fullName: [this.staffDto.fullName, [Validators.required]],
        ethnic: [this.staffDto.ethnic, [Validators.required]],
        dateOfBirth: [this.staffDto.dateOfBirth, [Validators.required]],
        gender: [this.staffDto.gender, [Validators.required]],
        phoneNumber: [this.staffDto.phoneNumber, [Validators.required]],
        address: [this.staffDto.address, [Validators.required]],
        detailAddress: [this.staffDto.detailAddress, [Validators.required]],
        expertiseId: [this.staffDto.expertise.id, [Validators.required]],
        positionId: [this.staffDto.position.id, [Validators.required]],
        description: [this.staffDto.description],
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

  updateStaff(): void {
    if (this.validateForm.valid) {
      this.staffReq = {
        fullName: this.validateForm.value.fullName,
        ethnic: this.validateForm.value.ethnic,
        dateOfBirth: this.validateForm.value.dateOfBirth,
        gender: this.validateForm.value.gender,
        phoneNumber: this.validateForm.value.phoneNumber,
        address: this.validateForm.value.address,
        detailAddress: this.validateForm.value.detailAddress,
        expertiseId: this.validateForm.value.expertiseId,
        positionId: this.validateForm.value.positionId,
        description: this.validateForm.value.description,
      }
      this.userService.updateStaff(this.staffId, this.staffReq).subscribe(data => {
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
