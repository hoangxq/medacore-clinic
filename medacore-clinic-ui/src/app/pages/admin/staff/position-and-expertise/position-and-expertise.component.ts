import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { ExpertiseDto, PositionDto } from 'src/app/commons/dto/position-expertise';
import { ExpertiseService } from 'src/app/services/expertise.service';
import { PositionService } from 'src/app/services/position.service';
import { ModalCreateExpertiseComponent } from '../../modal/staff/modal-create-expertise/modal-create-expertise.component';
import { ModalCreatePositionComponent } from '../../modal/staff/modal-create-position/modal-create-position.component';
import { ModalUpdateExpertiseComponent } from '../../modal/staff/modal-update-expertise/modal-update-expertise.component';
import { ModalUpdatePositionComponent } from '../../modal/staff/modal-update-position/modal-update-position.component';

interface ColumnItemPosition {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<PositionDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<PositionDto> | null;
}

interface ColumnItemExpertise {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ExpertiseDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<ExpertiseDto> | null;
}

@Component({
  selector: 'app-position-and-expertise',
  templateUrl: './position-and-expertise.component.html',
  styleUrls: ['./position-and-expertise.component.scss']
})
export class PositionAndExpertiseComponent implements OnInit {
  total = 1;
  loading1 = true;
  loading2 = true;
  pageSize = 10;
  pageIndex = 1;

  listPosition: PositionDto[] = [];
  listExpertise: ExpertiseDto[] = [];

  visible = false;

  listOfColumnsPosition: ColumnItemPosition[] = [
    {
      name: "Tên chức vụ",
      sortOrder: null,
      sortFn: (a: PositionDto, b: PositionDto) => a.name.localeCompare(b.name),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Mô tả",
      sortOrder: null,
      sortFn: (a: PositionDto, b: PositionDto) => a.description.localeCompare(b.description),
      listOfFilter: [],
      filterFn: null
    },
  ]

  listOfColumnsExpertise: ColumnItemExpertise[] = [
    {
      name: "Tên chuyên môn",
      sortOrder: null,
      sortFn: (a: PositionDto, b: PositionDto) => a.name.localeCompare(b.name),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Mô tả",
      sortOrder: null,
      sortFn: (a: PositionDto, b: PositionDto) => a.description.localeCompare(b.description),
      listOfFilter: [],
      filterFn: null
    },
  ]

  constructor(
    private positionService: PositionService,
    private expertiseService: ExpertiseService,
    private modalService: NzModalService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getListPosition();
    this.getListExpertise();
  }

  getListPosition(): void {
    this.positionService.getAllPosition().subscribe(data => {
      this.listPosition = data.data;
      this.loading1 = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  getListExpertise(): void {
    this.expertiseService.getAllExpertise().subscribe(data => {
      this.listExpertise = data.data;
      this.loading2 = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  trackByName(_: number, item: ColumnItemPosition): string {
    return item.name;
  }

  showModalCreateExpertise(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới chuyên môn',
      nzContent: ModalCreateExpertiseComponent,
      nzWidth: 550,
    });
    modal.afterClose.subscribe(() => this.getListExpertise())
  }

  editExpertise(expertiseId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật chuyên môn',
      nzContent: ModalUpdateExpertiseComponent,
      nzWidth: 550,
      nzComponentParams: {
        expertiseId
      }
    });
    modal.afterClose.subscribe(() => this.getListExpertise())
  }

  removeExpertise(): void {

  }

  showModalCreatePosition(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới chức vụ',
      nzContent: ModalCreatePositionComponent,
      nzWidth: 550,
    });
    modal.afterClose.subscribe(() => this.getListPosition())
  }

  editPosition(positionId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật chức vụ',
      nzContent: ModalUpdatePositionComponent,
      nzWidth: 550,
      nzComponentParams: {
        positionId
      }
    });
    modal.afterClose.subscribe(() => this.getListPosition())
  }

  removePosition(): void {

  }

}