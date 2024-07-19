import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { TIME_FRAME } from 'src/app/commons/constants/time-frame';
import { PatientDto } from 'src/app/commons/dto/patient';
import { StaffDto } from 'src/app/commons/dto/staff';
import { AppointmentScheduleReq } from 'src/app/commons/request/appointment-schedule.req';
import { StaffCriteria } from 'src/app/commons/request/staff.req';
import { AppointmentScheduleService } from 'src/app/services/appoiment-schedule.service';
import { UserService } from 'src/app/services/user.service';

interface ColumnItemDoctor {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<StaffDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<StaffDto> | null;
}

@Component({
  selector: 'app-patient-create-schedule',
  templateUrl: './patient-create-schedule.component.html',
  styleUrls: ['./patient-create-schedule.component.scss']
})
export class PatientCreateScheduleComponent implements OnInit {

  patientUsername: string = sessionStorage.getItem("username") || "";
  patientDto: PatientDto = new PatientDto();

  constructor(
    private userService: UserService,
    private modalService: NzModalService,
    private appointmentScheduleService: AppointmentScheduleService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  appointmentScheduleReq: AppointmentScheduleReq = new AppointmentScheduleReq();
  validateForm!: UntypedFormGroup;

  ngOnInit(): void {
    this.getListStaff();
    this.getPatientInfo();
    this.validateForm = this.fb.group({
      timeFrame: [null, [Validators.required]],
      time: [null, [Validators.required]],
    });
  }

  listTimeFrame: string[] = TIME_FRAME;

  rowSelectedDoctor: number = -1;

  getPatientInfo(): void {
    this.userService.getPatientByUsername(this.patientUsername).subscribe(data => {
      this.patientDto = data.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  clickEventDoctor(doctorId: number): void {
    this.rowSelectedDoctor = doctorId;
  }

  staffCriteria: StaffCriteria = new StaffCriteria();

  listOfColumnsDoctor: ColumnItemDoctor[] = [
    {
      name: "Họ tên",
      sortOrder: null,
      sortFn: (a: StaffDto, b: StaffDto) => a.fullName.localeCompare(b.fullName),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Chức vụ",
      sortOrder: null,
      sortFn: (a: StaffDto, b: StaffDto) => a.position.name.localeCompare(b.position.name),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Chuyên môn",
      sortOrder: null,
      sortFn: (a: StaffDto, b: StaffDto) => a.expertise.name.localeCompare(b.expertise.name),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Giới tính",
      sortOrder: null,
      sortFn: null,
      listOfFilter: [
        { text: 'Nam', value: 'male' },
        { text: 'Nữ', value: 'female' }
      ],
      filterFn: (gender: string, item: StaffDto) => item.gender == gender
    }
  ]

  totalDoctor = 1;
  listStaff: StaffDto[] = [];
  listOfDisplayDataDoctor: any;
  loadingDoctor = true;
  pageSizeDoctor = 10;
  pageIndexDoctor = 1;

  searchValueDoctor = '';
  visibleDoctor = false;

  getListStaff(): void {
    this.userService.getCustomStaffs(this.staffCriteria).subscribe(data => {
      this.listStaff = data.data.filter(e => e.accountDto.authority == "ROLE_DOCTOR");
      this.listOfDisplayDataDoctor = this.listStaff;
      this.loadingDoctor = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  trackByNameDoctor(_: number, item: ColumnItemDoctor): string {
    return item.name;
  }

  resetDoctor(): void {
    this.searchValueDoctor = '';
    this.searchDoctor();
  }

  searchDoctor(): void {
    this.visibleDoctor = false;
    this.listOfDisplayDataDoctor = this.listStaff.filter((item: StaffDto) => item.phoneNumber.indexOf(this.searchValueDoctor) !== -1);
  }

  createSchedule(): void {
    if (this.rowSelectedDoctor == -1) {
      this.notification.create(
        'error',
        'Lỗi dữ liệu',
        'Cần phải chọn Bác sĩ cho lịch hẹn'
      );
    }
    else if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.appointmentScheduleReq = {
        patientId: this.patientDto.id,
        staffId: this.rowSelectedDoctor,
        timeFrame: this.validateForm.value.timeFrame,
        time: this.validateForm.value.time,
        status: 'PENDING'
      }
      console.log(this.appointmentScheduleReq)
      this.appointmentScheduleService.createSchedule(this.appointmentScheduleReq).subscribe(data => {
        this.router.navigate(['/patient/appointment-schedule'])
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

  public disabledDate = (current: Date): boolean => current < new Date();
}