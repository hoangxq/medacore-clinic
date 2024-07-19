import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-doctor-header-control',
  templateUrl: './doctor-header-control.component.html',
  styleUrls: ['./doctor-header-control.component.scss']
})
export class DoctorHeaderControlComponent implements OnInit {
  @Input() medicalRecordId!: number;
  @Input() option!: string;

  constructor(
    private notification: NzNotificationService,
    private medicalRecordService: MedicalRecordService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  saveMedicalRecord(): void {
    this.medicalRecordService.updateStatus(this.medicalRecordId, "DONE").subscribe(data => {
      this.router.navigate(['/doctor'])
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }
}
