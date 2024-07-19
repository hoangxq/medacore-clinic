import { Component, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MedicalRecordDto } from 'src/app/commons/dto/medical-record';
import { ServicesOfMedicalTestDto } from 'src/app/commons/dto/medical-test';
import { MedicineOfPrescriptionDto } from 'src/app/commons/dto/prescription';
import { AppointmentScheduleService } from 'src/app/services/appoiment-schedule.service';

@Component({
  selector: 'app-print-medicine',
  templateUrl: './print-medicine.component.html',
  styleUrls: ['./print-medicine.component.scss']
})
export class PrintMedicineComponent {
  @Input() medicalRecordDto!: MedicalRecordDto;
  @Input() listMedicines!: MedicineOfPrescriptionDto[];

  totalPrice: number = 0;
  healthInsurance: number = 0;
  patientPaid: number = 0;

  constructor(
    private modal: NzModalRef,
    private appointmentScheduleService: AppointmentScheduleService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.listMedicines.forEach(e => this.totalPrice += e.medicineDto.price * e.quantity);
    this.patientPaid = this.totalPrice - this.healthInsurance;
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
}
