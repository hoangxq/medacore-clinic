import { AppointmentScheduleCriteria } from './../../../../commons/dto/appointment-schedule';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { AppointmentScheduleDto } from 'src/app/commons/dto/appointment-schedule';
import { NursingUpdateScheduleStatusComponent } from '../modal/nursing-update-schedule-status/nursing-update-schedule-status.component';
import { AppointmentScheduleService } from './../../../../services/appoiment-schedule.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<AppointmentScheduleDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<AppointmentScheduleDto> | null;
}

@Component({
  selector: 'app-nursing-appointment-schedule',
  templateUrl: './nursing-appointment-schedule.component.html',
  styleUrls: ['./nursing-appointment-schedule.component.scss']
})
export class NursingAppointmentScheduleComponent implements OnInit {
  total = 1;
  listAppointmentScheduleDto: AppointmentScheduleDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchPatientNameValue = '';
  searchPatientPhoneNumberValue = '';
  visiblePatientName = false;
  visiblePatientPhoneNumber = false;

  appointmentScheduleCriteria: AppointmentScheduleCriteria = {
    startDate: new Date(),
    endDate: new Date()
  };

  dateRange: Date[] = [new Date(), new Date()];

  listOfColumns: ColumnItem[] = [
    {
      name: "Bác sĩ",
      sortOrder: null,
      sortFn: (a: AppointmentScheduleDto, b: AppointmentScheduleDto) => a.staffDto.fullName
        .localeCompare(b.staffDto.fullName),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Ngày hẹn",
      sortOrder: null,
      sortFn: (a: AppointmentScheduleDto, b: AppointmentScheduleDto) => a.time > b.time ? -1 : 1,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Khung giờ",
      sortOrder: null,
      sortFn: (a: AppointmentScheduleDto, b: AppointmentScheduleDto) => a.timeFrame
        .localeCompare(b.timeFrame),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Trạng thái",
      sortOrder: null,
      sortFn: (a: AppointmentScheduleDto, b: AppointmentScheduleDto) => a.status
        .localeCompare(b.status),
        listOfFilter: [
          { text: 'Đang xử lý', value: 'PENDING' },
          { text: 'Đã đến khám', value: 'DONE' },
          { text: 'Đã hủy', value: 'CANCELED' },
          { text: 'Đã duyệt', value: 'APPROVE' },
        ],
        filterFn: (statusList: string[], item: AppointmentScheduleDto) => statusList.some(status => item.status.indexOf(status) !== -1)
    },
  ]

  constructor(
    private appointmentScheduleService: AppointmentScheduleService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    // this.getListAppointmentSchedule();
    this.findListAppointmentSchedule();
  }

  getListAppointmentSchedule(): void {
    this.appointmentScheduleService.getAllSchedules().subscribe(data => {
      this.listAppointmentScheduleDto = data.data;
      this.listOfDisplayData = this.listAppointmentScheduleDto;
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  findListAppointmentSchedule(): void {
    this.appointmentScheduleService.getSchedules(this.appointmentScheduleCriteria).subscribe(data => {
      this.listAppointmentScheduleDto = data.data;
      this.listOfDisplayData = this.listAppointmentScheduleDto;
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

  resetSearchPatientName(): void {
    this.searchPatientNameValue = '';
    this.searchPatientName();
  }

  resetSearchPatientPhoneNumber(): void {
    this.searchPatientPhoneNumberValue = '';
    this.searchPatientPhoneNumber();
  }

  searchPatientName(): void {
    this.visiblePatientName = false;
    this.listOfDisplayData = this.listAppointmentScheduleDto
      .filter((item: AppointmentScheduleDto) => item.patientDto.fullName.indexOf(this.searchPatientNameValue) !== -1);
  }

  searchPatientPhoneNumber(): void {
    this.visiblePatientPhoneNumber = false;
    this.listOfDisplayData = this.listAppointmentScheduleDto
      .filter((item: AppointmentScheduleDto) => item.patientDto.phoneNumber.indexOf(this.searchPatientPhoneNumberValue) !== -1);
  }

  editSchedule(scheduleId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật lịch hẹn',
      nzContent: NursingUpdateScheduleStatusComponent,
      nzWidth: 750,
      nzStyle: { top: '10px' },
      nzComponentParams: {
        scheduleId
      }
    });
    modal.afterClose.subscribe(() => this.findListAppointmentSchedule())
  }

  removeSchedule(): void {

  }

  onSearch() {
    this.appointmentScheduleCriteria.startDate = this.dateRange[0];
    this.appointmentScheduleCriteria.endDate = this.dateRange[1];
    this.findListAppointmentSchedule();
  }

}