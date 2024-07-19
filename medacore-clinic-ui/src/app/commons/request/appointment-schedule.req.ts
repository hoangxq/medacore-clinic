export class AppointmentScheduleReq {
    staffId!: number;
    patientId!: number;
    time!: Date;
    status!: string;
    timeFrame!: string;
}