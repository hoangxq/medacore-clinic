import { AccountRegister } from "../dto/account";

export class PatientCriteria {
    keyword!: string;
}

export class RegisterPatientReq {
    signupRequest!: AccountRegister;
    patientReq!: PatientReq;
}

export class PatientReq {
    fullName!: string;
    ethnic!: string;
    dateOfBirth!: Date;
    job!: string;
    gender!: string;
    phoneNumber!: string;
    address!: string;
    detailAddress!: string;
    description!: string;
}