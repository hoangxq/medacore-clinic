import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { AccountDto } from 'src/app/commons/dto/account';
import { UserService } from 'src/app/services/user.service';
import { CreateAccountComponent } from '../modal/accounts/create-account/create-account.component';
import { UpdateAccountComponent } from '../modal/accounts/update-account/update-account.component';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<AccountDto> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<AccountDto> | null;
}

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.scss']
})
export class AdminAccountsComponent implements OnInit {
  total = 1;
  listAccount: AccountDto[] = [];
  listOfDisplayData: any;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  searchValue = '';
  visible = false;

  listOfColumns: ColumnItem[] = [
    {
      name: "Email",
      sortOrder: null,
      sortFn: (a: AccountDto, b: AccountDto) => a.email.localeCompare(b.email),
      listOfFilter: [],
      filterFn: null
    },
    {
      name: "Quyền",
      sortOrder: null,
      sortFn: (a: AccountDto, b: AccountDto) => a.authority.localeCompare(b.authority),
      listOfFilter: [
        { text: 'Bệnh nhân', value: 'ROLE_PATIENT' },
        { text: 'Bác sĩ', value: 'ROLE_DOCTOR' },
        { text: 'Điều dưỡng', value: 'ROLE_NURSING' },
        { text: 'Quản lý', value: 'ROLE_ADMIN' }
      ],
      filterFn: (authority: string, item: AccountDto) => item.authority == authority
    },
  ]

  constructor(
    private userService: UserService,
    private modalService: NzModalService,
    private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getListAccounts();
  }

  getListAccounts(): void {
    this.userService.getAccounts().subscribe(data => {
      this.listAccount = data.data;
      console.log(this.listAccount)
      this.listOfDisplayData = this.listAccount;
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
    this.listOfDisplayData = this.listAccount.filter((item: AccountDto) => item.username.indexOf(this.searchValue) !== -1);
  }

  showModalCreateAccount(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới tài khoản',
      nzContent: CreateAccountComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getListAccounts())
  }

  editAccount(accountId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật tài khoản',
      nzContent: UpdateAccountComponent,
      nzWidth: 750,
      nzComponentParams: {
        accountId
      }
    });
    modal.afterClose.subscribe(() => this.getListAccounts())
  }

  removeAccount(): void {

  }

}