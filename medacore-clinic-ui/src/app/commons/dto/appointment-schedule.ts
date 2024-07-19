import { PatientDto } from "./patient";
import { BaseResponse } from "./response";
import { StaffDto } from "./staff";

export class AppointmentScheduleDto {
    id!: number;
    staffDto!: StaffDto;
    patientDto!: PatientDto;
    time!: Date;
    status!: string;
    timeFrame!: string;
}

export class AppointmentScheduleListRes implements BaseResponse {
    message!: string;
    data!: AppointmentScheduleDto[];
}

export class AppointmentScheduleRes implements BaseResponse {
    message!: string;
    data!: AppointmentScheduleDto;
}

export class AppointmentScheduleCriteria {
    startDate?: Date;
    endDate?: Date;
    patientUsername?: string;
}