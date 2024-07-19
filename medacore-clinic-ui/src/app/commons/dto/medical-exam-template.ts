import { BaseResponse } from "./response";
import { StaffDto } from "./staff";

export class MedicalExamTemplateDto {
    id!: number;
    name!: string;
    description!: string;
    staffDto?: StaffDto;
}

export class MedicalExamTemplateListRes implements BaseResponse {
    message!: string;
    data!: MedicalExamTemplateDto[];
}

export class MedicalExamTemplateRes implements BaseResponse {
    message!: string;
    data!: MedicalExamTemplateDto;
}

export class MedicalExamTemplateReq {
    name!: string;
    description!: string;
    staffUsername?: string;
}