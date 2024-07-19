import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StaffDto } from 'src/app/commons/dto/staff';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.scss']
})
export class DoctorSidebarComponent implements OnInit {

  username: string = sessionStorage.getItem('username') || '';
  staffDto: StaffDto = new StaffDto();

  constructor(
    private userService: UserService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    this.userService.getStaffByUsername(this.username).subscribe(data => {
      this.staffDto = data.data;
      console.log(data)
      return this.staffDto.fullName;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

}
