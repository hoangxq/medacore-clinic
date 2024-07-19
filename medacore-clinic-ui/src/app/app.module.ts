import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import vi from '@angular/common/locales/vi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { ToastrModule } from 'ngx-toastr';
import { NgZorroAntdModule } from './ant-design/ant-design.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ModalCreateMedicalExamTemplateComponent } from './components/modal/modal-create-medical-exam-template/modal-create-medical-exam-template.component';
import { ModalUpdateMedicalExamTemplateComponent } from './components/modal/modal-update-medical-exam-template/modal-update-medical-exam-template.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminAccountsComponent } from './pages/admin/admin-accounts/admin-accounts.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminMedicalDepartmentComponent } from './pages/admin/admin-medical-department/admin-medical-department.component';
import { AdminMedicalExamTemplateComponent } from './pages/admin/admin-medical-exam-template/admin-medical-exam-template.component';
import { AdminMedicineManagementComponent } from './pages/admin/admin-medicine-management/admin-medicine-management.component';
import { AdminPatientManagementComponent } from './pages/admin/admin-patient-management/admin-patient-management.component';
import { AdminServiceManagementComponent } from './pages/admin/admin-service-management/admin-service-management.component';
import { AdminSidebarComponent } from './pages/admin/admin-sidebar/admin-sidebar.component';
import { AdminStaffManagementComponent } from './pages/admin/admin-staff-management/admin-staff-management.component';
import { CreateAccountComponent } from './pages/admin/modal/accounts/create-account/create-account.component';
import { UpdateAccountComponent } from './pages/admin/modal/accounts/update-account/update-account.component';
import { CreateDepartmentComponent } from './pages/admin/modal/department/create-department/create-department.component';
import { UpdateDepartmentComponent } from './pages/admin/modal/department/update-department/update-department.component';
import { ModalCreateMedicineComponent } from './pages/admin/modal/medicine/modal-create-medicine/modal-create-medicine.component';
import { ModalUpdateMedicineComponent } from './pages/admin/modal/medicine/modal-update-medicine/modal-update-medicine.component';
import { ModalCreatePatientComponent } from './pages/admin/modal/patient/modal-create-patient/modal-create-patient.component';
import { ModalUpdatePatientComponent } from './pages/admin/modal/patient/modal-update-patient/modal-update-patient.component';
import { ModalCreateServicesComponent } from './pages/admin/modal/services/modal-create-services/modal-create-services.component';
import { ModalUpdateServicesComponent } from './pages/admin/modal/services/modal-update-services/modal-update-services.component';
import { ModalCreateExpertiseComponent } from './pages/admin/modal/staff/modal-create-expertise/modal-create-expertise.component';
import { ModalCreatePositionComponent } from './pages/admin/modal/staff/modal-create-position/modal-create-position.component';
import { ModalCreateStaffComponent } from './pages/admin/modal/staff/modal-create-staff/modal-create-staff.component';
import { ModalUpdateExpertiseComponent } from './pages/admin/modal/staff/modal-update-expertise/modal-update-expertise.component';
import { ModalUpdatePositionComponent } from './pages/admin/modal/staff/modal-update-position/modal-update-position.component';
import { ModalUpdateStaffComponent } from './pages/admin/modal/staff/modal-update-staff/modal-update-staff.component';
import { PositionAndExpertiseComponent } from './pages/admin/staff/position-and-expertise/position-and-expertise.component';
import { PatientHeaderControlComponent } from './pages/patient/medical-record/patient-header-control/patient-header-control.component';
import { PatientMedicalRecordInfoComponent } from './pages/patient/medical-record/patient-medical-record-info/patient-medical-record-info.component';
import { PatientPrescriptionComponent } from './pages/patient/medical-record/patient-prescription/patient-prescription.component';
import { PatientSpecifyClsComponent } from './pages/patient/medical-record/patient-specify-cls/patient-specify-cls.component';
import { PatientAppointmentScheduleComponent } from './pages/patient/patient-appointment-schedule/patient-appointment-schedule.component';
import { PatientCreateScheduleComponent } from './pages/patient/patient-create-schedule/patient-create-schedule.component';
import { PatientMedicalRecordComponent } from './pages/patient/patient-medical-record/patient-medical-record.component';
import { PatientSidebarComponent } from './pages/patient/patient-sidebar/patient-sidebar.component';
import { CreateMedicalExaminationComponent } from './pages/staff/doctor/create-medical-examination/create-medical-examination.component';
import { DoctorAppointmentComponent } from './pages/staff/doctor/doctor-appointment/doctor-appointment.component';
import { DoctorCreatePrescriptionComponent } from './pages/staff/doctor/doctor-create-prescription/doctor-create-prescription.component';
import { DoctorHeaderControlComponent } from './pages/staff/doctor/doctor-header-control/doctor-header-control.component';
import { DoctorSidebarComponent } from './pages/staff/doctor/doctor-sidebar/doctor-sidebar.component';
import { DoctorSpecifyClsComponent } from './pages/staff/doctor/doctor-specify-cls/doctor-specify-cls.component';
import { PrintMedicalRecordInfoComponent } from './pages/staff/doctor/modal/print-medical-record-info/print-medical-record-info.component';
import { PrintMedicalTestComponent } from './pages/staff/doctor/modal/print-medical-test/print-medical-test.component';
import { PrintMedicineComponent } from './pages/staff/doctor/modal/print-medicine/print-medicine.component';
import { CreateMedicalRecordComponent } from './pages/staff/nursing/create-medical-record/create-medical-record.component';
import { NursingCreatePatientComponent } from './pages/staff/nursing/modal/nursing-create-patient/nursing-create-patient.component';
import { NursingCreateScheduleComponent } from './pages/staff/nursing/modal/nursing-create-schedule/nursing-create-schedule.component';
import { NursingUpdateScheduleStatusComponent } from './pages/staff/nursing/modal/nursing-update-schedule-status/nursing-update-schedule-status.component';
import { PrintPaymentModalComponent } from './pages/staff/nursing/modal/print-payment-modal/print-payment-modal.component';
import { NursingAppointmentScheduleComponent } from './pages/staff/nursing/nursing-appointment-schedule/nursing-appointment-schedule.component';
import { NursingAppointmentComponent } from './pages/staff/nursing/nursing-appointment/nursing-appointment.component';
import { NursingPaymentInvoicePrintingComponent } from './pages/staff/nursing/nursing-payment-invoice-printing/nursing-payment-invoice-printing.component';
import { NursingPaymentProcessingComponent } from './pages/staff/nursing/nursing-payment-processing/nursing-payment-processing.component';
import { NursingSidebarComponent } from './pages/staff/nursing/nursing-sidebar/nursing-sidebar.component';
import { DoctorMedicalExamTemplateComponent } from './pages/staff/doctor/doctor-medical-exam-template/doctor-medical-exam-template.component';

registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    AdminSidebarComponent,
    PatientSidebarComponent,
    PatientAppointmentScheduleComponent,
    PatientCreateScheduleComponent,
    AdminDashboardComponent,
    AdminMedicineManagementComponent,
    AdminMedicalDepartmentComponent,
    AdminServiceManagementComponent,
    AdminStaffManagementComponent,
    AdminPatientManagementComponent,
    PageNotFoundComponent,
    ModalCreatePatientComponent,
    ModalUpdatePatientComponent,
    ModalCreateStaffComponent,
    ModalUpdateStaffComponent,
    PositionAndExpertiseComponent,
    ModalCreatePositionComponent,
    ModalUpdatePositionComponent,
    ModalUpdateExpertiseComponent,
    ModalCreateExpertiseComponent,
    ModalCreateMedicineComponent,
    ModalUpdateMedicineComponent,
    ModalUpdateServicesComponent,
    ModalCreateServicesComponent,
    CreateDepartmentComponent,
    UpdateDepartmentComponent,
    AdminAccountsComponent,
    CreateAccountComponent,
    UpdateAccountComponent,
    DoctorSidebarComponent,
    NursingSidebarComponent,
    NursingAppointmentScheduleComponent,
    NursingAppointmentComponent,
    DoctorAppointmentComponent,
    NursingCreateScheduleComponent,
    NursingCreatePatientComponent,
    CreateMedicalRecordComponent,
    CreateMedicalExaminationComponent,
    DoctorSpecifyClsComponent,
    DoctorCreatePrescriptionComponent,
    DoctorHeaderControlComponent,
    HomeComponent,
    PatientMedicalRecordComponent,
    PatientMedicalRecordInfoComponent,
    PatientSpecifyClsComponent,
    PatientPrescriptionComponent,
    PatientHeaderControlComponent,
    NursingUpdateScheduleStatusComponent,
    NursingPaymentProcessingComponent,
    NursingPaymentInvoicePrintingComponent,
    PrintPaymentModalComponent,
    PrintMedicalRecordInfoComponent,
    PrintMedicalTestComponent,
    PrintMedicineComponent,
    AdminMedicalExamTemplateComponent,
    ModalCreateMedicalExamTemplateComponent,
    ModalUpdateMedicalExamTemplateComponent,
    DoctorMedicalExamTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    BrowserAnimationsModule,
    NgZorroAntdModule,
    CKEditorModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
