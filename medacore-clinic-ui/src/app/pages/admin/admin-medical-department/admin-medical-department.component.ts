import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { DepartmentDto } from 'src/app/commons/dto/department';
import { DepartmentService } from 'src/app/services/department.service';
import { CreateDepartmentComponent } from '../modal/department/create-department/create-department.component';
import { UpdateDepartmentComponent } from '../modal/department/update-department/update-department.component';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DepartmentDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DepartmentDto> | null;
}

@Component({
  selector: 'app-admin-medical-department',
  templateUrl: './admin-medical-department.component.html',
  styleUrls: ['./admin-medical-department.component.scss']
})
export class AdminMedicalDepartmentComponent implements OnInit {
  total = 1;
  listDepartment: DepartmentDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchValue = '';
  visible = false;

  listOfColumns: ColumnItem[] = [
    {
      name: "Mô tả",
      sortOrder: null,
      sortFn: (a: DepartmentDto, b: DepartmentDto) => a.description.localeCompare(b.description),
      listOfFilter: [],
      filterFn: null
    },
  ]

  constructor(
    private departmentService: DepartmentService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListDepartment();
  }

  getListDepartment(): void {
    this.departmentService.getAllDepartment().subscribe(data => {
      this.listDepartment = data.data;
      this.listOfDisplayData = this.listDepartment;
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
    this.listOfDisplayData = this.listDepartment.filter((item: DepartmentDto) => item.name.indexOf(this.searchValue) !== -1);
  }

  showModalCreateDepartment(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới khoa',
      nzContent: CreateDepartmentComponent,
      nzWidth: 450,
    });
    modal.afterClose.subscribe(() => this.getListDepartment())
  }

  editDepartment(departmentId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật khoa',
      nzContent: UpdateDepartmentComponent,
      nzWidth: 450,
      nzComponentParams: {
        departmentId
      }
    });
    modal.afterClose.subscribe(() => this.getListDepartment())
  }

  removeDepartment(): void {

  }

}