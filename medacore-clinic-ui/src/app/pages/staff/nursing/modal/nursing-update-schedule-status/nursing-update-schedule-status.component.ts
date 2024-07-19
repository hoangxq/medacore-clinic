import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppointmentScheduleDto } from 'src/app/commons/dto/appointment-schedule';
import { AppointmentScheduleReq } from 'src/app/commons/request/appointment-schedule.req';
import { AppointmentScheduleService } from 'src/app/services/appoiment-schedule.service';

@Component({
  selector: 'app-nursing-update-schedule-status',
  templateUrl: './nursing-update-schedule-status.component.html',
  styleUrls: ['./nursing-update-schedule-status.component.scss']
})
export class NursingUpdateScheduleStatusComponent implements OnInit {

  @Input() scheduleId!: number;

  scheduleDto: AppointmentScheduleDto = new AppointmentScheduleDto();

  appointmentScheduleReq: AppointmentScheduleReq = new AppointmentScheduleReq();
  validateForm!: UntypedFormGroup;

  constructor(
    private modal: NzModalRef,
    private appointmentScheduleService: AppointmentScheduleService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      status: [null, [Validators.required]],
    });
    this.getScheduleById();
  }

  destroyModal(): void {
    this.modal.close();
  }

  getScheduleById(): void {
    this.appointmentScheduleService.getScheduleById(this.scheduleId).subscribe(data => {
      this.scheduleDto = data.data;

      this.validateForm = this.fb.group({
        status: [this.scheduleDto.status, [Validators.required]],
      });

      this.appointmentScheduleReq = {
        patientId: this.scheduleDto.patientDto.id,
        staffId: this.scheduleDto.staffDto.id,
        status: this.scheduleDto.status,
        time: this.scheduleDto.time,
        timeFrame: this.scheduleDto.timeFrame
      }
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        error.error.message
      );
    })
  }

  updateSchedule(): void {
    console.log(this.appointmentScheduleReq)
    if (this.validateForm.valid) {
      this.appointmentScheduleReq.status = this.validateForm.value.status;
      console.log(this.appointmentScheduleReq)
      this.appointmentScheduleService.updateSchedule(this.scheduleId, this.appointmentScheduleReq).subscribe(data => {
        this.destroyModal();
      }, error => {
        this.notification.create(
          'error',
          'Lỗi máy chủ',
          error.error.message
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