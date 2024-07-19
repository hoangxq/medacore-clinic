import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { PatientDto } from 'src/app/commons/dto/patient';
import { PatientCriteria } from 'src/app/commons/request/patient.req';
import { UserService } from 'src/app/services/user.service';
import { ModalCreatePatientComponent } from '../modal/patient/modal-create-patient/modal-create-patient.component';
import { ModalUpdatePatientComponent } from '../modal/patient/modal-update-patient/modal-update-patient.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<PatientDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<PatientDto> | null;
}

@Component({
  selector: 'app-admin-patient-management',
  templateUrl: './admin-patient-management.component.html',
  styleUrls: ['./admin-patient-management.component.scss']
})
export class AdminPatientManagementComponent implements OnInit {
  total = 1;
  listPatient: PatientDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  patientCriteria: PatientCriteria = new PatientCriteria();

  searchValue = '';
  visible = false;

  listOfColumns: ColumnItem[] = [
    {
      name: "Họ tên",
      sortOrder: null,
      sortFn: (a: PatientDto, b: PatientDto) => a.fullName.localeCompare(b.fullName),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Ngày sinh",
      sortOrder: null,
      sortFn: (a: PatientDto, b: PatientDto) => a.dateOfBirth.getTime() - b.dateOfBirth.getTime(),
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
    {
      name: "Email",
      sortOrder: null,
      sortFn: (a: PatientDto, b: PatientDto) => a.accountDto.email.localeCompare(b.accountDto.email),
      listOfFilter: [],
      filterFn: null
    },
  ]

  constructor(
    private userService: UserService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListPatient();
  }

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
      nzContent: ModalCreatePatientComponent,
      nzWidth: 750,
      nzStyle: { top: '10px' }
    });
    modal.afterClose.subscribe(() => this.getListPatient())
  }

  editPatient(patientId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật bệnh nhân',
      nzContent: ModalUpdatePatientComponent,
      nzWidth: 750,
      nzStyle: { top: '10px' },
      nzComponentParams: {
        patientId
      }
    });
    modal.afterClose.subscribe(() => this.getListPatient())
  }

  removePatient(): void {
  }

}