import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountRegister } from 'src/app/commons/dto/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  accountReq: AccountRegister = new AccountRegister();
  validateForm!: UntypedFormGroup;

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
      password: [null, [Validators.required]],
    });
  }

  destroyModal(): void {
    this.modal.close();
  }

  createAccount(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.accountReq = {
        username: this.validateForm.value.username,
        email: this.validateForm.value.email,
        password: this.validateForm.value.password,
        authority: 'ROLE_ADMIN'
      }
      console.log(this.accountReq)
      this.accountService.register(this.accountReq).subscribe(data => {
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
