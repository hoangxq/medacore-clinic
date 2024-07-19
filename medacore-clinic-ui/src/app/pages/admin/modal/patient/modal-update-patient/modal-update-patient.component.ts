import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PatientDto } from 'src/app/commons/dto/patient';
import { PatientReq } from 'src/app/commons/request/patient.req';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-update-patient',
  templateUrl: './modal-update-patient.component.html',
  styleUrls: ['./modal-update-patient.component.scss']
})
export class ModalUpdatePatientComponent implements OnInit {
  @Input() patientId!: number;

  patientReq: PatientReq = new PatientReq();
  validateForm!: UntypedFormGroup;
  patientDto: PatientDto = new PatientDto();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private userService: UserService,
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
    this.getPatientById();
  }

  getPatientById(): void {
    this.userService.getPatient(this.patientId).subscribe(data => {
      this.patientDto = data.data;
      console.log(data.data)

      this.validateForm = this.fb.group({
        fullName: [this.patientDto.fullName, [Validators.required]],
        ethnic: [this.patientDto.ethnic, [Validators.required]],
        dateOfBirth: [this.patientDto.dateOfBirth, [Validators.required]],
        job: [this.patientDto.job],
        gender: [this.patientDto.gender, [Validators.required]],
        phoneNumber: [this.patientDto.phoneNumber, [Validators.required]],
        address: [this.patientDto.address, [Validators.required]],
        detailAddress: [this.patientDto.detailAddress, [Validators.required]],
        description: [this.patientDto.description],
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

  updatePatient(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
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
      this.userService.updatePatient(this.patientId, this.patientReq).subscribe(data => {
        console.log(data);
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
