import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PatientDto } from '../commons/dto/patient';
import { StaffDto } from '../commons/dto/staff';
import { UserService } from './user.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtToken: BehaviorSubject<string> = new BehaviorSubject<string>('');

  

  constructor(
    // private userService: UserService,
    private notification: NzNotificationService
  ) { }

  isLoggedIn() {
    return !!sessionStorage.getItem('jwtToken');
  }

  getTokenSync(): string {
    return sessionStorage.getItem('jwtToken') || '';
  }

  saveToken(token: string) {
    sessionStorage.setItem('jwtToken', token);
    this.jwtToken.next(token); 
  }

  // getToken() {
  //   return this.jwtToken;
  // }

  addTokenToHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getTokenSync()}`
    });
  }


  // getNameOfAccount(): string {
  //   const role: string = sessionStorage.getItem('role') || '';
  //   const username: string = sessionStorage.getItem('username') || '';
  //   if (role == "ROLE_PATIENT") {
  //     let patientDto: PatientDto = new PatientDto();
  //     this.userService.getPatientByUsername(username).subscribe(data => {
  //       patientDto = data.data;
  //       console.log(data)
  //       return patientDto.fullName;
  //     }, error => {
  //       this.notification.create(
  //         'error',
  //         'Lỗi máy chủ',
  //         'Có lỗi xảy ra vui lòng thử lại sau'
  //       );
  //     })
  //     return patientDto.fullName;
  //   } else if (role == "ROLE_DOCTOR" || role == "ROLE_NURSING") {
  //     let staffDto: StaffDto = new StaffDto();
  //     this.userService.getStaffByUsername(username).subscribe(data => {
  //       staffDto = data.data;
  //       console.log(data)
  //       return staffDto.fullName;
  //     }, error => {
  //       this.notification.create(
  //         'error',
  //         'Lỗi máy chủ',
  //         'Có lỗi xảy ra vui lòng thử lại sau'
  //       );
  //     })
  //     return staffDto.fullName;
  //   } else return "NONE";
  // }
}
