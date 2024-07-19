import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { MedicalRecordDto } from 'src/app/commons/dto/medical-record';
import { MedicalRecordService } from 'src/app/services/medical-record.service';
import { MedicalRecordCriteria } from './../../../../commons/dto/medical-record';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<MedicalRecordDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<MedicalRecordDto> | null;
}

@Component({
  selector: 'app-nursing-appointment',
  templateUrl: './nursing-appointment.component.html',
  styleUrls: ['./nursing-appointment.component.scss']
})
export class NursingAppointmentComponent implements OnInit {
  total = 1;
  listMedicalRecordDto: MedicalRecordDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchPatientNameValue = '';
  searchPatientPhoneNumberValue = '';
  visiblePatientName = false;
  visiblePatientPhoneNumber = false;

  medicalRecordCriteria: MedicalRecordCriteria = {
    startDate: new Date(),
    endDate: new Date()
  };

  dateRange: Date[] = [new Date(), new Date()];

  listOfColumns: ColumnItem[] = [
    {
      name: "Bác sĩ",
      sortOrder: null,
      sortFn: (a: MedicalRecordDto, b: MedicalRecordDto) => a.staffDto.fullName
        .localeCompare(b.staffDto.fullName),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Thời gian khám",
      sortOrder: null,
      sortFn: (a: MedicalRecordDto, b: MedicalRecordDto) => a.time.getTime() - b.time.getTime(),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Trạng thái",
      sortOrder: null,
      sortFn: (a: MedicalRecordDto, b: MedicalRecordDto) => a.status
        .localeCompare(b.status),
      listOfFilter: [
        { text: 'Đang khám', value: 'PENDING' },
        { text: 'Đã đến', value: 'ARRIVED' },
        { text: 'Đã khám', value: 'DONE' },
      ],
      filterFn: (statusList: string[], item: MedicalRecordDto) => statusList.some(status => item.status.indexOf(status) !== -1)
    },
    {
      name: "Trạng thái thanh toán",
      sortOrder: null,
      sortFn: (a: MedicalRecordDto, b: MedicalRecordDto) => a.paymentStatus
        .localeCompare(b.paymentStatus),
      listOfFilter: [
        { text: 'Đã thanh toán', value: 'PAID' },
        { text: 'Chưa thanh toán', value: 'UNPAID' },
      ],
      filterFn: (statusList: string[], item: MedicalRecordDto) => statusList.some(status => item.status.indexOf(status) !== -1)
    },
  ]

  constructor(
    private medicalRecordService: MedicalRecordService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getListMedicalRecords();
  }

  getListMedicalRecords(): void {
    this.medicalRecordService.getAllMedicalRecords(this.medicalRecordCriteria).subscribe(data => {
      this.listMedicalRecordDto = data.data;
      this.listOfDisplayData = this.listMedicalRecordDto;
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
    this.listOfDisplayData = this.listMedicalRecordDto
      .filter((item: MedicalRecordDto) => item.patientDto.fullName.indexOf(this.searchPatientNameValue) !== -1);
  }

  searchPatientPhoneNumber(): void {
    this.visiblePatientPhoneNumber = false;
    this.listOfDisplayData = this.listMedicalRecordDto
      .filter((item: MedicalRecordDto) => item.patientDto.phoneNumber.indexOf(this.searchPatientPhoneNumberValue) !== -1);
  }

  onPayment(medicalRecordId: number): void {
    this.medicalRecordService.getMedicalRecordById(medicalRecordId).subscribe(data => {
      let medicalRecord = data.data;
      console.log(medicalRecord)
      if (medicalRecord.paymentStatus == "PAID") {
        this.modalService.confirm({
          nzTitle: '<i>Xác nhận</i>',
          nzContent: '<b>Bạn muốn xem thông tin thanh toán của ca khám này?</b>',
          nzOnOk: () => this.router.navigate(['/nursing/payment-processing', medicalRecordId])
        });
      }
      else if (medicalRecord.paymentStatus == "UNPAID") {
        this.modalService.confirm({
          nzTitle: '<i>Xác nhận</i>',
          nzContent: '<b>Bạn muốn tiếp nhận thanh toán cho ca khám này không?</b>',
          nzOnOk: () => this.router.navigate(['/nursing/payment-processing', medicalRecordId])
        });
      }
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  onSearch() {
    this.medicalRecordCriteria.startDate = this.dateRange[0];
    this.medicalRecordCriteria.endDate = this.dateRange[1];
    this.getListMedicalRecords();
  }
}