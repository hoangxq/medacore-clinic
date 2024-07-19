import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import { AppointmentScheduleCriteria, AppointmentScheduleDto } from 'src/app/commons/dto/appointment-schedule';
import { AppointmentScheduleReq } from 'src/app/commons/request/appointment-schedule.req';
import { AppointmentScheduleService } from 'src/app/services/appoiment-schedule.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<AppointmentScheduleDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<AppointmentScheduleDto> | null;
}

@Component({
  selector: 'app-patient-appointment-schedule',
  templateUrl: './patient-appointment-schedule.component.html',
  styleUrls: ['./patient-appointment-schedule.component.scss']
})
export class PatientAppointmentScheduleComponent implements OnInit {
  patientUsername: string = sessionStorage.getItem("username") || ""

  total = 1;
  listAppointmentScheduleDto: AppointmentScheduleDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchDoctorNameValue = '';
  searchDoctorPhoneNumberValue = '';
  visibleDoctorName = false;
  visibleDoctorPhoneNumber = false;

  appointmentScheduleCriteria: AppointmentScheduleCriteria = {
    startDate: undefined,
    endDate: undefined,
    patientUsername: this.patientUsername
  };

  dateRange: Date[] = [new Date(), new Date()];

  statusColumn: ColumnItem =
    {
      name: "Trạng thái",
      sortOrder: null,
      sortFn: null,
      listOfFilter: [
        { text: 'Đang xử lý', value: 'PENDING' },
        { text: 'Đã đến khám', value: 'DONE' },
        { text: 'Đã hủy', value: 'CANCELED' },
        { text: 'Đã duyệt', value: 'APPROVE' },
      ],
      filterFn: (statusList: string[], item: AppointmentScheduleDto) => statusList.some(status => item.status.indexOf(status) !== -1)
    }

  constructor(
    private appointmentScheduleService: AppointmentScheduleService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListAppointmentSchedule();
  }

  getListAppointmentSchedule(): void {
    this.appointmentScheduleService.getScheduleOfPatient(this.patientUsername, this.appointmentScheduleCriteria).subscribe(data => {
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

  resetSearchDoctorName(): void {
    this.searchDoctorNameValue = '';
    this.searchDoctorName();
  }

  resetSearchDoctorPhoneNumber(): void {
    this.searchDoctorPhoneNumberValue = '';
    this.searchDoctorPhoneNumber();
  }

  searchDoctorName(): void {
    this.visibleDoctorName = false;
    this.listOfDisplayData = this.listAppointmentScheduleDto
      .filter((item: AppointmentScheduleDto) => item.staffDto.fullName.indexOf(this.searchDoctorNameValue) !== -1);
  }

  searchDoctorPhoneNumber(): void {
    this.visibleDoctorPhoneNumber = false;
    this.listOfDisplayData = this.listAppointmentScheduleDto
      .filter((item: AppointmentScheduleDto) => item.staffDto.phoneNumber.indexOf(this.searchDoctorPhoneNumberValue) !== -1);
  }

  editSchedule(patientId: number): void {

  }

  removeSchedule(scheduleId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn có chắc muốn hủy lịch hẹn này không?</b>',
      nzOnOk: () => {
        let appointmentScheduleReq: AppointmentScheduleReq = new AppointmentScheduleReq();
        appointmentScheduleReq.status = "CANCELED";
        this.appointmentScheduleService.updateSchedule(scheduleId, appointmentScheduleReq).subscribe(data => {
          this.getListAppointmentSchedule();
        }, error => {
          this.notification.create(
            'error',
            'Lỗi máy chủ',
            error.error.message
          );
        })
      }
    });
  }

  onSearch() {
    this.appointmentScheduleCriteria.startDate = this.dateRange[0];
    this.appointmentScheduleCriteria.endDate = this.dateRange[1];
    this.getListAppointmentSchedule();
  }
}