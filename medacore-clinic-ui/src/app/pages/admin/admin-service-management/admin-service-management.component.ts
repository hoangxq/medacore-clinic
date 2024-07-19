import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { ServicesDto } from 'src/app/commons/dto/services';
import { ServicesService } from 'src/app/services/services.service';
import { ModalCreateServicesComponent } from '../modal/services/modal-create-services/modal-create-services.component';
import { ModalUpdateServicesComponent } from '../modal/services/modal-update-services/modal-update-services.component';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ServicesDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<ServicesDto> | null;
}

@Component({
  selector: 'app-admin-service-management',
  templateUrl: './admin-service-management.component.html',
  styleUrls: ['./admin-service-management.component.scss']
})
export class AdminServiceManagementComponent implements OnInit {
  total = 1;
  listServices: ServicesDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchValue = '';
  visible = false;

  listOfColumns: ColumnItem[] = [
    {
      name: "Giá dịch vụ",
      sortOrder: null,
      sortFn: (a: ServicesDto, b: ServicesDto) => a.price - b.price,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Khoa thực hiện",
      sortOrder: null,
      sortFn: (a: ServicesDto, b: ServicesDto) => a.department.name.localeCompare(b.department.name),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Mô tả",
      sortOrder: null,
      sortFn: (a: ServicesDto, b: ServicesDto) => a.description.localeCompare(b.description),
      listOfFilter: [],
      filterFn: null
    },
  ]

  constructor(
    private servicesService: ServicesService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListServices();
  }

  getListServices(): void {
    this.servicesService.getAllServices().subscribe(data => {
      this.listServices = data.data;
      this.listOfDisplayData = this.listServices;
      this.loading = false;
      console.log(this.listOfDisplayData)
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
    this.listOfDisplayData = this.listServices.filter((item: ServicesDto) => item.name.indexOf(this.searchValue) !== -1);
  }

  showModalCreateServices(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới dich vụ',
      nzContent: ModalCreateServicesComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getListServices())
  }

  editServices(servicesId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật dịch vụ',
      nzContent: ModalUpdateServicesComponent,
      nzWidth: 750,
      nzComponentParams: {
        servicesId
      }
    });
    modal.afterClose.subscribe(() => this.getListServices())
  }

  removeServices(): void {

  }

}