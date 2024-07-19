import { Time } from "@angular/common";
import { MedicineDto } from "./medicine";
import { BaseResponse } from "./response";

export class PrescriptionDto {
    id!: number;
    medicalRecordId!: number;
    time!: Time;
    medicines!: MedicineOfPrescriptionDto[];
}

export class MedicineOfPrescriptionDto {
    id!: number;
    medicineDto!: MedicineDto;
    quantity!: number;
    note!: string;
}

export class PrescriptionRes implements BaseResponse {
    message!: string;
    data!: PrescriptionDto;
}