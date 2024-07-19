import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import { AppointmentScheduleDto } from 'src/app/commons/dto/appointment-schedule';
import { MedicalRecordDto } from 'src/app/commons/dto/medical-record';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<MedicalRecordDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<MedicalRecordDto> | null;
}

@Component({
  selector: 'app-patient-medical-record',
  templateUrl: './patient-medical-record.component.html',
  styleUrls: ['./patient-medical-record.component.scss']
})
export class PatientMedicalRecordComponent implements OnInit {
  patientUsername: string = sessionStorage.getItem("username") || "";

  total = 1;
  listMedicalRecordDto: MedicalRecordDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchDoctorNameValue = '';
  searchDoctorPhoneNumberValue = '';
  visibleDoctorName = false;
  visibleDoctorPhoneNumber = false;

  statusColumn: ColumnItem =
  {
    name: "Trạng thái",
    sortOrder: null,
    sortFn: null,
    listOfFilter: [
      { text: 'Đang khám', value: 'PENDING' },
      { text: 'Đã đến', value: 'ARRIVED' },
      { text: 'Đã khám', value: 'DONE' },
    ],
    filterFn: (statusList: string[], item: MedicalRecordDto) => statusList.some(status => item.status.indexOf(status) !== -1)
  }

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
    this.medicalRecordService.getAllMedicalRecordsOfPatient(this.patientUsername).subscribe(data => {
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
    this.listOfDisplayData = this.listMedicalRecordDto
      .filter((item: MedicalRecordDto) => item.staffDto.fullName.indexOf(this.searchDoctorNameValue) !== -1);
  }

  searchDoctorPhoneNumber(): void {
    this.visibleDoctorPhoneNumber = false;
    this.listOfDisplayData = this.listMedicalRecordDto
      .filter((item: MedicalRecordDto) => item.staffDto.phoneNumber.indexOf(this.searchDoctorPhoneNumberValue) !== -1);
  }

  medicalExamination(medicalRecordId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn muốn xem thông tin khám bệnh của ca khám này?</b>',
      nzOnOk: () => this.router.navigate(['/patient/medical-examination', medicalRecordId])
    });
  }
}
