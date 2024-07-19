import { Component, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicalRecordDto, MedicalRecordInfoDto } from 'src/app/commons/dto/medical-record';
import { ServicesOfMedicalTestDto } from 'src/app/commons/dto/medical-test';
import { MedicineOfPrescriptionDto } from 'src/app/commons/dto/prescription';
import { AppointmentScheduleService } from 'src/app/services/appoiment-schedule.service';

@Component({
  selector: 'app-print-medical-record-info',
  templateUrl: './print-medical-record-info.component.html',
  styleUrls: ['./print-medical-record-info.component.scss']
})
export class PrintMedicalRecordInfoComponent {
  @Input() medicalRecordDto!: MedicalRecordDto;
  @Input() medicalRecordInfoDto!: MedicalRecordInfoDto;

  bmiValue!: number;

  constructor(
    private modal: NzModalRef,
    private appointmentScheduleService: AppointmentScheduleService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.calculateBMI();
  }

  destroyModal(): void {
    this.modal.close();
  }

  onPrint(): void {
    let data = this.modal.getElement()
    if (data != null) {
      let unwantedElement = data.querySelector('#no-print');
      console.log(unwantedElement)
      if (unwantedElement != null) {
        unwantedElement.classList.add('pdf-hidden'); // Thêm class mới
      }
      window.print();
      if (unwantedElement != null) {
        unwantedElement.classList.remove('pdf-hidden'); // Xóa class mới
      }
    }
  }

  calculateBMI(): void {
    let heightValue = this.medicalRecordInfoDto.height / 100;
    this.bmiValue = this.medicalRecordInfoDto.weight / (heightValue * heightValue)
  }
}
