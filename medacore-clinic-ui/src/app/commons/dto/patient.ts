import { AccountDto } from "./account";
import { BaseResponse } from "./response";

export class PatientListRes implements BaseResponse {
    message!: string;
    data!: PatientDto[];
}

export class PatientRes implements BaseResponse {
    message!: string;
    data!: PatientDto;
}

export class PatientDto {
    id!: number;
    fullName!: string;
    ethnic!: string;
    dateOfBirth!: Date;
    job!: string;
    gender!: string;
    phoneNumber!: string;
    address!: string;
    detailAddress!: string;
    description!: string;
    accountDto!: AccountDto;
}