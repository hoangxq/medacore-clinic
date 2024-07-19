import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { MedicineDto } from 'src/app/commons/dto/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { ModalCreateMedicineComponent } from '../modal/medicine/modal-create-medicine/modal-create-medicine.component';
import { ModalUpdateMedicineComponent } from '../modal/medicine/modal-update-medicine/modal-update-medicine.component';
import { MedicineCriteria } from 'src/app/commons/request/medicines.req';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<MedicineDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<MedicineDto> | null;
}

@Component({
  selector: 'app-admin-medicine-management',
  templateUrl: './admin-medicine-management.component.html',
  styleUrls: ['./admin-medicine-management.component.scss']
})
export class AdminMedicineManagementComponent implements OnInit {
  total = 1;
  listMedicine: MedicineDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  medicineCriteria: MedicineCriteria = new MedicineCriteria();

  searchValue = '';
  visible = false;

  listOfColumns: ColumnItem[] = [
    {
      name: "Đơn vị",
      sortOrder: null,
      sortFn: (a: MedicineDto, b: MedicineDto) => a.unit.localeCompare(b.unit),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Giá thuốc",
      sortOrder: null,
      sortFn: (a: MedicineDto, b: MedicineDto) => a.price - b.price,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Cách sử dụng",
      sortOrder: null,
      sortFn: (a: MedicineDto, b: MedicineDto) => a.useManual.localeCompare(b.useManual),
      listOfFilter: [],
      filterFn: null
    },
  ]

  constructor(
    private medicineService: MedicineService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListMedicine();
  }

  getListMedicine(): void {
    this.medicineService.getAllMedicine(this.medicineCriteria).subscribe(data => {
      this.listMedicine = data.data;
      this.listOfDisplayData = this.listMedicine;
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
    this.listOfDisplayData = this.listMedicine.filter((item: MedicineDto) => item.name.indexOf(this.searchValue) !== -1);
  }

  showModalCreateMedicine(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới Thuốc',
      nzContent: ModalCreateMedicineComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getListMedicine())
  }

  editMedicine(medicineId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật thuốc',
      nzContent: ModalUpdateMedicineComponent,
      nzWidth: 750,
      nzComponentParams: {
        medicineId
      }
    });
    modal.afterClose.subscribe(() => this.getListMedicine())
  }

  removeMedicine(): void {

  }

}