import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ModalCreatePatientComponent } from 'src/app/pages/admin/modal/patient/modal-create-patient/modal-create-patient.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  showModalCreatePatient(): void {
    const modal = this.modalService.create({
      nzTitle: 'Đăng ký khám bệnh',
      nzContent: ModalCreatePatientComponent,
      nzWidth: 750,
      nzStyle: { top: '10px' },
      nzOnOk: () => this.router.navigate(['/login'])
    });
  }

}
