import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { StaffDto } from 'src/app/commons/dto/staff';
import { UserService } from 'src/app/services/user.service';
import { ModalCreateStaffComponent } from '../modal/staff/modal-create-staff/modal-create-staff.component';
import { ModalUpdateStaffComponent } from '../modal/staff/modal-update-staff/modal-update-staff.component';
import { StaffCriteria } from './../../../commons/request/staff.req';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<StaffDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<StaffDto> | null;
}

@Component({
  selector: 'app-admin-staff-management',
  templateUrl: './admin-staff-management.component.html',
  styleUrls: ['./admin-staff-management.component.scss']
})
export class AdminStaffManagementComponent implements OnInit {
  total = 1;
  listStaff: StaffDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchValue = '';
  visible = false;

  staffCriteria: StaffCriteria = new StaffCriteria();

  listOfColumns: ColumnItem[] = [
    {
      name: "Họ tên",
      sortOrder: null,
      sortFn: (a: StaffDto, b: StaffDto) => a.fullName.localeCompare(b.fullName),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Ngày sinh",
      sortOrder: null,
      sortFn: (a: StaffDto, b: StaffDto) => a.dateOfBirth.getTime() - b.dateOfBirth.getTime(),
      listOfFilter: [],
      filterFn: null
    }, {
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
      name: "Địa chỉ",
      sortOrder: null,
      sortFn: (a: StaffDto, b: StaffDto) => a.address.localeCompare(b.address),
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
    },
    {
      name: "Quyền",
      sortOrder: null,
      sortFn: (a: StaffDto, b: StaffDto) => a.accountDto.authority.localeCompare(b.accountDto.authority),
      listOfFilter: [
        { text: 'Bác sĩ', value: 'ROLE_DOCTOR' },
        { text: 'Điều dưỡng', value: 'ROLE_NURSING' },
        { text: 'Quản lý', value: 'ROLE_ADMIN' }
      ],
      filterFn: (authority: string, item: StaffDto) => item.accountDto.authority == authority
    },
  ]

  constructor(
    private userService: UserService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListStaff();
  }

  getListStaff(): void {
    this.userService.getCustomStaffs(this.staffCriteria).subscribe(data => {
      this.listStaff = data.data;
      this.listOfDisplayData = this.listStaff;
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
    this.listOfDisplayData = this.listStaff.filter((item: StaffDto) => item.phoneNumber.indexOf(this.searchValue) !== -1);
  }

  showModalCreateStaff(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới nhân viên',
      nzContent: ModalCreateStaffComponent,
      nzStyle: { top: '10px' },
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getListStaff())
  }

  editStaff(staffId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật nhân viên',
      nzContent: ModalUpdateStaffComponent,
      nzWidth: 750,
      nzStyle: { top: '10px' },
      nzComponentParams: {
        staffId
      }
    });
    modal.afterClose.subscribe(() => this.getListStaff())
  }

  removeStaff(): void {

  }

}