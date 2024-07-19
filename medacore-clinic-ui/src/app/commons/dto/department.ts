import { BaseResponse } from "./response";

export class DepartmentDto {
    id!: number;
    name!: string;
    description!: string;
}

export class DepartmentListRes implements BaseResponse {
    message!: string;
    data!: DepartmentDto[];
}

export class DepartmentRes implements BaseResponse {
    message!: string;
    data!: DepartmentDto;
}