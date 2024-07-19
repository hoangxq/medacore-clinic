import { MedicalRecordService } from './../../../../services/medical-record.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import { TIME_FRAME } from 'src/app/commons/constants/time-frame';
import { PatientDto } from 'src/app/commons/dto/patient';
import { StaffDto } from 'src/app/commons/dto/staff';
import { AppointmentScheduleReq } from 'src/app/commons/request/appointment-schedule.req';
import { PatientCriteria } from 'src/app/commons/request/patient.req';
import { StaffCriteria } from 'src/app/commons/request/staff.req';
import { AppointmentScheduleService } from 'src/app/services/appoiment-schedule.service';
import { UserService } from 'src/app/services/user.service';
import { NursingCreatePatientComponent } from '../modal/nursing-create-patient/nursing-create-patient.component';
import { MedicalRecordReq } from 'src/app/commons/request/medical-record.req';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<PatientDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<PatientDto> | null;
}

interface ColumnItemDoctor {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<StaffDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<StaffDto> | null;
}

@Component({
  selector: 'app-create-medical-record',
  templateUrl: './create-medical-record.component.html',
  styleUrls: ['./create-medical-record.component.scss']
})
export class CreateMedicalRecordComponent implements OnInit {

  constructor(
    private userService: UserService,
    private modalService: NzModalService,
    private medicalRecordService: MedicalRecordService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  medicalRecordReq: MedicalRecordReq = new MedicalRecordReq();
  validateForm!: UntypedFormGroup;

  ngOnInit(): void {
    this.getListPatient();
    this.getListStaff();
  }

  listTimeFrame: string[] = TIME_FRAME;

  total = 1;
  listPatient: PatientDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  patientCriteria: PatientCriteria = new PatientCriteria();

  searchValue = '';
  visible = false;

  rowSelectedPatient: number = -1;
  rowSelectedDoctor: number = -1;

  listOfColumns: ColumnItem[] = [
    {
      name: "Họ tên",
      sortOrder: null,
      sortFn: (a: PatientDto, b: PatientDto) => a.fullName.localeCompare(b.fullName),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Địa chỉ",
      sortOrder: null,
      sortFn: (a: PatientDto, b: PatientDto) => a.address.localeCompare(b.address),
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
      filterFn: (gender: string, item: PatientDto) => item.gender == gender
    },
  ]

  getListPatient(): void {
    this.userService.getCustomPatients(this.patientCriteria).subscribe(data => {
      this.listPatient = data.data;
      this.listOfDisplayData = this.listPatient;
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listPatient.filter((item: PatientDto) => item.phoneNumber.indexOf(this.searchValue) !== -1);
  }

  showModalCreatePatient(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới bệnh nhân',
      nzContent: NursingCreatePatientComponent,
      nzWidth: 750,
      nzStyle: { top: '10px' }
    });
    modal.afterClose.subscribe(() => this.getListPatient())
  }

  clickEvent(patientId: number): void {
    this.rowSelectedPatient = patientId;
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
    this.searchValue = '';
    this.search();
  }

  searchDoctor(): void {
    this.visible = false;
    this.listOfDisplayData = this.listStaff.filter((item: StaffDto) => item.phoneNumber.indexOf(this.searchValue) !== -1);
  }

  createMedicalRecord(): void {
    if (this.rowSelectedDoctor == -1 || this.rowSelectedPatient == -1) {
      this.notification.create(
        'error',
        'Lỗi dữ liệu',
        'Cần phải chọn bệnh nhân và Bác sĩ cho lịch hẹn'
      );
    }
    else {
      this.medicalRecordReq = {
        patientId: this.rowSelectedPatient,
        staffId: this.rowSelectedDoctor,
      }
      this.medicalRecordService.createMedicalRecord(this.medicalRecordReq).subscribe(data => {
        this.router.navigate(['/nursing/appointment'])
      }, error => {
        this.notification.create(
          'error',
          'Lỗi máy chủ',
          'Khung thời gian này đã được đặt'
        );
      })
    }
  }

  public disabledDate = (current: Date): boolean => current < new Date();
}