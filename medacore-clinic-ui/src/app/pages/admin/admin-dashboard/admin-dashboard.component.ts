import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicineCriteria } from 'src/app/commons/request/medicines.req';
import { PatientCriteria } from 'src/app/commons/request/patient.req';
import { StaffCriteria } from 'src/app/commons/request/staff.req';
import { MedicineService } from 'src/app/services/medicine.service';
import { ServicesService } from 'src/app/services/services.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  patientNumber: number = 0;
  staffNumber: number = 0;
  serviceNumber: number = 0;
  medicineNumber: number = 0;

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private medicineService: MedicineService,
    private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.getListPatient();
    this.getListServices();
    this.getListStaff();
    this.getListMedicine();
  }

  getListPatient(): void {
    this.userService.getCustomPatients(new PatientCriteria()).subscribe(data => {
      this.patientNumber = data.data.length
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  getListStaff(): void {
    this.userService.getCustomStaffs(new StaffCriteria()).subscribe(data => {
      this.staffNumber = data.data.length;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  getListServices(): void {
    this.servicesService.getAllServices().subscribe(data => {
      this.serviceNumber = data.data.length;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  getListMedicine(): void {
    this.medicineService.getAllMedicine(new MedicineCriteria()).subscribe(data => {
      this.medicineNumber = data.data.length;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

}