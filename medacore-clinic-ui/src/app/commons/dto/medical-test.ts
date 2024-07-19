import { Time } from "@angular/common";
import { BaseResponse } from "./response";
import { ServicesDto } from "./services";

export class ServicesOfMedicalTestDto {
    id!: number;
    serviceDto!: ServicesDto;
    quantity!: number;
    note!: string;
}

export class MedicalTestDto {
    id!: number;
    name!: string;
    totalPrice!: number;
    time!: Time;
    medicalRecordId!: number;
    services!: ServicesOfMedicalTestDto[];
}

export class MedicalTestRes implements BaseResponse {
    message!: string;
    data!: MedicalTestDto;
}