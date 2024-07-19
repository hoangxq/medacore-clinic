import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountRegister } from 'src/app/commons/dto/account';
import { PatientReq, RegisterPatientReq } from 'src/app/commons/request/patient.req';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-nursing-create-patient',
  templateUrl: './nursing-create-patient.component.html',
  styleUrls: ['./nursing-create-patient.component.scss']
})
export class NursingCreatePatientComponent implements OnInit {
  patientReq: PatientReq = new PatientReq();
  registerPatientReq: RegisterPatientReq = new RegisterPatientReq();
  accountRegister: AccountRegister = new AccountRegister();
  validateForm!: UntypedFormGroup;

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private authService: AccountService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      ethnic: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      job: [null],
      gender: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      address: [null, [Validators.required]],
      detailAddress: [null, [Validators.required]],
      description: [null],
    });
  }

  destroyModal(): void {
    this.modal.close();
  }

  createPatient(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.accountRegister = {
        username: this.validateForm.value.phoneNumber,
        email: this.validateForm.value.phoneNumber + '@gmail.com',
        authority: "ROLE_PATIENT",
        password: this.validateForm.value.phoneNumber,
      }
      this.patientReq = {
        fullName: this.validateForm.value.fullName,
        ethnic: this.validateForm.value.ethnic,
        dateOfBirth: this.validateForm.value.dateOfBirth,
        job: this.validateForm.value.job,
        gender: this.validateForm.value.gender,
        phoneNumber: this.validateForm.value.phoneNumber,
        address: this.validateForm.value.address,
        detailAddress: this.validateForm.value.detailAddress,
        description: this.validateForm.value.description,
      }
      this.registerPatientReq = {
        signupRequest: this.accountRegister,
        patientReq: this.patientReq
      }
      this.authService.registerPatient(this.registerPatientReq).subscribe(data => {
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
