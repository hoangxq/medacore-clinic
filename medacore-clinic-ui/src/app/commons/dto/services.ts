import { DepartmentDto } from "./department";
import { BaseResponse } from "./response";

export class ServicesDto {
    id!: number;
    name!: string;
    price!: number;
    description!: string;
    department!: DepartmentDto;
}

export class ServicesListRes implements BaseResponse {
    message!: string;
    data!: ServicesDto[];
}

export class ServicesRes implements BaseResponse {
    message!: string;
    data!: ServicesDto;
}