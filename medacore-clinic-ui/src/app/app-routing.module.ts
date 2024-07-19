import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminAccountsComponent } from './pages/admin/admin-accounts/admin-accounts.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminMedicalDepartmentComponent } from './pages/admin/admin-medical-department/admin-medical-department.component';
import { AdminMedicineManagementComponent } from './pages/admin/admin-medicine-management/admin-medicine-management.component';
import { AdminPatientManagementComponent } from './pages/admin/admin-patient-management/admin-patient-management.component';
import { AdminServiceManagementComponent } from './pages/admin/admin-service-management/admin-service-management.component';
import { AdminStaffManagementComponent } from './pages/admin/admin-staff-management/admin-staff-management.component';
import { PositionAndExpertiseComponent } from './pages/admin/staff/position-and-expertise/position-and-expertise.component';
import { PatientMedicalRecordInfoComponent } from './pages/patient/medical-record/patient-medical-record-info/patient-medical-record-info.component';
import { PatientPrescriptionComponent } from './pages/patient/medical-record/patient-prescription/patient-prescription.component';
import { PatientSpecifyClsComponent } from './pages/patient/medical-record/patient-specify-cls/patient-specify-cls.component';
import { PatientAppointmentScheduleComponent } from './pages/patient/patient-appointment-schedule/patient-appointment-schedule.component';
import { PatientCreateScheduleComponent } from './pages/patient/patient-create-schedule/patient-create-schedule.component';
import { PatientMedicalRecordComponent } from './pages/patient/patient-medical-record/patient-medical-record.component';
import { CreateMedicalExaminationComponent } from './pages/staff/doctor/create-medical-examination/create-medical-examination.component';
import { DoctorAppointmentComponent } from './pages/staff/doctor/doctor-appointment/doctor-appointment.component';
import { DoctorCreatePrescriptionComponent } from './pages/staff/doctor/doctor-create-prescription/doctor-create-prescription.component';
import { DoctorSpecifyClsComponent } from './pages/staff/doctor/doctor-specify-cls/doctor-specify-cls.component';
import { CreateMedicalRecordComponent } from './pages/staff/nursing/create-medical-record/create-medical-record.component';
import { NursingCreateScheduleComponent } from './pages/staff/nursing/modal/nursing-create-schedule/nursing-create-schedule.component';
import { NursingAppointmentScheduleComponent } from './pages/staff/nursing/nursing-appointment-schedule/nursing-appointment-schedule.component';
import { NursingAppointmentComponent } from './pages/staff/nursing/nursing-appointment/nursing-appointment.component';
import { NursingPaymentInvoicePrintingComponent } from './pages/staff/nursing/nursing-payment-invoice-printing/nursing-payment-invoice-printing.component';
import { NursingPaymentProcessingComponent } from './pages/staff/nursing/nursing-payment-processing/nursing-payment-processing.component';
import { AdminGuard } from './services/guard/admin.guard';
import { AuthGuard } from './services/guard/auth.guard';
import { DoctorGuard } from './services/guard/doctor.guard';
import { NursingGuard } from './services/guard/nursing.guard';
import { PatientGuard } from './services/guard/patient.guard';
import { AdminMedicalExamTemplateComponent } from './pages/admin/admin-medical-exam-template/admin-medical-exam-template.component';
import { DoctorMedicalExamTemplateComponent } from './pages/staff/doctor/doctor-medical-exam-template/doctor-medical-exam-template.component';

const patientRoutes: Routes = [
  { path: 'patient', pathMatch: 'full', redirectTo: '/patient/medical-record' },
  { path: 'patient/medical-record', component: PatientMedicalRecordComponent, canActivate: [AuthGuard, PatientGuard] },
  { path: 'patient/appointment-schedule', component: PatientAppointmentScheduleComponent, canActivate: [AuthGuard, PatientGuard] },
  { path: 'patient/create-schedule', component: PatientCreateScheduleComponent, canActivate: [AuthGuard, PatientGuard] },
  { path: 'patient/medical-examination/:id', component: PatientMedicalRecordInfoComponent, canActivate: [AuthGuard, PatientGuard] },
  { path: 'patient/specify-cls/:id', component: PatientSpecifyClsComponent, canActivate: [AuthGuard, PatientGuard] },
  { path: 'patient/prescription/:id', component: PatientPrescriptionComponent, canActivate: [AuthGuard, PatientGuard] },

]

const doctorRoutes: Routes = [
  { path: 'doctor', component: DoctorAppointmentComponent, canActivate: [AuthGuard, DoctorGuard] },
  { path: 'doctor/medical-examination/:id', component: CreateMedicalExaminationComponent, canActivate: [AuthGuard, DoctorGuard] },
  { path: 'doctor/specify-cls/:id', component: DoctorSpecifyClsComponent, canActivate: [AuthGuard, DoctorGuard] },
  { path: 'doctor/prescription/:id', component: DoctorCreatePrescriptionComponent, canActivate: [AuthGuard, DoctorGuard] },
  { path: 'doctor/medical-exam-templates', component: DoctorMedicalExamTemplateComponent, canActivate: [AuthGuard, DoctorGuard] },
]

const nursingRoutes: Routes = [
  { path: 'nursing', pathMatch: 'full', redirectTo: '/nursing/appointment-schedule' },
  { path: 'nursing/appointment-schedule', component: NursingAppointmentScheduleComponent, canActivate: [AuthGuard, NursingGuard] },
  { path: 'nursing/appointment', component: NursingAppointmentComponent, canActivate: [AuthGuard, NursingGuard] },
  { path: 'nursing/create-schedule', component: NursingCreateScheduleComponent, canActivate: [AuthGuard, NursingGuard] },
  { path: 'nursing/create-medical-record', component: CreateMedicalRecordComponent, canActivate: [AuthGuard, NursingGuard] },
  { path: 'nursing/payment-processing/:id', component: NursingPaymentProcessingComponent, canActivate: [AuthGuard, NursingGuard] },
  { path: 'nursing/invoice-printing', component: NursingPaymentInvoicePrintingComponent, canActivate: [AuthGuard, NursingGuard] },
]

const adminRoutes: Routes = [
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/medical-department', component: AdminMedicalDepartmentComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/medicine', component: AdminMedicineManagementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/patient', component: AdminPatientManagementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/services', component: AdminServiceManagementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/staff', component: AdminStaffManagementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/position-and-expertise', component: PositionAndExpertiseComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/accounts', component: AdminAccountsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/medical-exam-templates', component: AdminMedicalExamTemplateComponent, canActivate: [AuthGuard, AdminGuard] },
]

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  ...patientRoutes,
  ...doctorRoutes,
  ...nursingRoutes,
  ...adminRoutes,
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
