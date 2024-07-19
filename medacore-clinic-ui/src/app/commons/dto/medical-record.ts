import { PatientDto } from "./patient";
import { BaseResponse } from "./response";
import { StaffDto } from "./staff";

export class MedicalRecordDto {
    id!: number;
    time!: Date;
    patientDto!: PatientDto;
    staffDto!: StaffDto;
    status!: string;
    paymentStatus!: string;
}

export class MedicalRecordInfoDto {
    id!: number;
    weight!: number;
    height!: number;
    bodyTemperature!: number;
    heartbeat!: number;
    bloodPressure!: number;
    detailMedical!: string;
    diagnose!: string;
    solution!: string;
    medicalRecordDto!: MedicalRecordDto;
}

export class MedicalRecordListRes implements BaseResponse {
    message!: string;
    data!: MedicalRecordDto[];
}

export class MedicalRecordRes implements BaseResponse {
    message!: string;
    data!: MedicalRecordDto;
}

export class MedicalRecordInfoRes implements BaseResponse {
    message!: string;
    data!: MedicalRecordInfoDto;
}

export class MedicalRecordCriteria {
    startDate?: Date;
    endDate?: Date;
    patientName?: string;
    patientPhone?: string;
}