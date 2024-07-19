import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { MedicalRecordCriteria, MedicalRecordDto } from 'src/app/commons/dto/medical-record';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<MedicalRecordDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<MedicalRecordDto> | null;
}

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {
  doctorUsername: string = sessionStorage.getItem("username") || "";

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
      name: "Giới tính",
      sortOrder: null,
      sortFn: null,
      listOfFilter: [
        { text: 'Nam', value: 'male' },
        { text: 'Nữ', value: 'female' }
      ],
      filterFn: (genderList: string[], item: MedicalRecordDto) => genderList.some(gender => item.patientDto.gender.indexOf(gender) !== -1)
    },
    {
      name: "Ngày sinh",
      sortOrder: null,
      sortFn: (a: MedicalRecordDto, b: MedicalRecordDto) => a.patientDto.dateOfBirth.getTime() -
        b.patientDto.dateOfBirth.getTime(),
      listOfFilter: [],
      filterFn: null
    },
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
    this.medicalRecordService.getAllMedicalRecordsOfDoctor(this.doctorUsername, this.medicalRecordCriteria).subscribe(data => {
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

  editMedicalRecord(patientId: number): void {
  }

  removeMedicalRecord(): void {

  }

  medicalExamination(medicalRecordId: number): void {
    this.medicalRecordService.getMedicalRecordById(medicalRecordId).subscribe(data => {
      let medicalRecord = data.data;
      console.log(medicalRecord)
      if (medicalRecord.status == "DONE") {
        this.modalService.confirm({
          nzTitle: '<i>Xác nhận</i>',
          nzContent: '<b>Bạn muốn xem thông tin khám bệnh của ca khám này?</b>',
          nzOnOk: () => this.router.navigate(['/doctor/medical-examination', medicalRecordId])
        });
      }
      else if (medicalRecord.status == "PENDING" || medicalRecord.status == "ARRIVED") {
        this.modalService.confirm({
          nzTitle: '<i>Xác nhận</i>',
          nzContent: '<b>Bạn có chắc muốn tiếp nhận ca khám này không?</b>',
          nzOnOk: () => {
            this.medicalRecordService.updateStatus(medicalRecordId, "PENDING").subscribe(data => {
              this.router.navigate(['/doctor/medical-examination', medicalRecordId])
            }, error => {
              this.notification.create(
                'error',
                'Lỗi máy chủ',
                'Có lỗi xảy ra vui lòng thử lại sau'
              );
            })
          }
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