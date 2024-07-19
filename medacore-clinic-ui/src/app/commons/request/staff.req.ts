import { AccountRegister } from "../dto/account";

export class StaffCriteria {
    keyword!: string;
}

export class RegisterStaffReq {
    signupRequest!: AccountRegister;
    staffReq!: StaffReq;
}

export class StaffReq {
    fullName!: string;
    ethnic!: string;
    dateOfBirth!: Date;
    gender!: string;
    phoneNumber!: string;
    address!: string;
    detailAddress!: string;
    description!: string;
    expertiseId!: number;
    positionId!: number;
}