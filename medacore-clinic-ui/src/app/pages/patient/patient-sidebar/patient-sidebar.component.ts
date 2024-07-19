import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PatientDto } from 'src/app/commons/dto/patient';
import { StaffDto } from 'src/app/commons/dto/staff';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-sidebar',
  templateUrl: './patient-sidebar.component.html',
  styleUrls: ['./patient-sidebar.component.scss']
})
export class PatientSidebarComponent implements OnInit {

  username: string = sessionStorage.getItem('username') || '';
  patientDto: PatientDto = new PatientDto();

  constructor(
    private userService: UserService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    this.userService.getPatientByUsername(this.username).subscribe(data => {
      this.patientDto = data.data;
      console.log(data)
      return this.patientDto.fullName;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

}
