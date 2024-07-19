import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-patient-header-control',
  templateUrl: './patient-header-control.component.html',
  styleUrls: ['./patient-header-control.component.scss']
})
export class PatientHeaderControlComponent implements OnInit {
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
    this.router.navigate(['/patient'])
  }
}