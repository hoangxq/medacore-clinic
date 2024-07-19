import { AccountDto } from "./account";
import { ExpertiseDto, PositionDto } from "./position-expertise";
import { BaseResponse } from "./response";

export class StaffListRes implements BaseResponse {
    message!: string;
    data!: StaffDto[];
}

export class StaffRes implements BaseResponse {
    message!: string;
    data!: StaffDto;
}

export class StaffDto {
    id!: number;
    fullName!: string;
    ethnic!: string;
    dateOfBirth!: Date;
    gender!: string;
    phoneNumber!: string;
    address!: string;
    detailAddress!: string;
    description!: string;
    accountDto!: AccountDto;
    expertise!: ExpertiseDto;
    position!: PositionDto;
}