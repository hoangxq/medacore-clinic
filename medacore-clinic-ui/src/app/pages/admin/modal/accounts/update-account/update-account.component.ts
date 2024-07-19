import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountDto, AccountReq } from 'src/app/commons/dto/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {
  @Input() accountId!: number;

  accountReq: AccountReq = new AccountReq();
  validateForm!: UntypedFormGroup;
  accountDto: AccountDto = new AccountDto();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      authority: [null, [Validators.required]],
    });
    this.getAccountById();
  }

  getAccountById(): void {
    this.accountService.getAccount(this.accountId).subscribe(data => {
      this.accountDto = data.data;

      this.validateForm = this.fb.group({
        username: [this.accountDto.username, [Validators.required]],
        email: [this.accountDto.email, [Validators.required]],
        authority: [this.accountDto.authority, [Validators.required]],
      });
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  destroyModal(): void {
    this.modal.close();
  }

  updateAccount(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.accountReq = {
        username: this.validateForm.value.username,
        email: this.validateForm.value.email,
        authority: this.validateForm.value.authority,
      }
      this.accountService.updateAccount(this.accountReq, this.accountId).subscribe(data => {
        this.destroyModal();
      }, error => {
        this.notification.create(
          'error',
          'Lỗi máy chủ',
          'Có lỗi xảy ra vui lòng thử lại sau'
        );
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
