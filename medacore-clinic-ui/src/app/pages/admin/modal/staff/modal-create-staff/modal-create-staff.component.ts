import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountRegister } from 'src/app/commons/dto/account';
import { ExpertiseDto, PositionDto } from 'src/app/commons/dto/position-expertise';
import { RegisterStaffReq, StaffReq } from 'src/app/commons/request/staff.req';
import { AccountService } from 'src/app/services/account.service';
import { ExpertiseService } from 'src/app/services/expertise.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-modal-create-staff',
  templateUrl: './modal-create-staff.component.html',
  styleUrls: ['./modal-create-staff.component.scss']
})
export class ModalCreateStaffComponent implements OnInit {
  staffReq: StaffReq = new StaffReq();
  registerStaffReq: RegisterStaffReq = new RegisterStaffReq();
  accountRegister: AccountRegister = new AccountRegister();
  validateForm!: UntypedFormGroup;

  listPosition: PositionDto[] = [];
  listExpertise: ExpertiseDto[] = [];

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private authService: AccountService,
    private positionService: PositionService,
    private expertiseService: ExpertiseService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getListExpertise();
    this.getListPosition();
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      authority: [null, [Validators.required]],
      fullName: [null, [Validators.required]],
      ethnic: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      detailAddress: [null, [Validators.required]],
      expertiseId: [null, [Validators.required]],
      positionId: [null, [Validators.required]],
      description: [null],
    });
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

  destroyModal(): void {
    this.modal.close();
  }

  createStaff(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.accountRegister = {
        username: this.validateForm.value.username,
        email: this.validateForm.value.email,
        authority: this.validateForm.value.authority,
        password: this.validateForm.value.password,
      }
      this.staffReq = {
        fullName: this.validateForm.value.fullName,
        ethnic: this.validateForm.value.ethnic,
        dateOfBirth: this.validateForm.value.dateOfBirth,
        gender: this.validateForm.value.gender,
        phoneNumber: this.validateForm.value.phoneNumber,
        address: this.validateForm.value.address,
        detailAddress: this.validateForm.value.detailAddress,
        description: this.validateForm.value.description,
        expertiseId: this.validateForm.value.expertiseId,
        positionId: this.validateForm.value.positionId,
      }
      this.registerStaffReq = {
        signupRequest: this.accountRegister,
        staffReq: this.staffReq
      }
      this.authService.registerStaff(this.registerStaffReq).subscribe(data => {
        console.log(data);
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
