import { BaseResponse } from "./response";

export class PositionListRes implements BaseResponse {
    message!: string;
    data!: PositionDto[];
}

export class ExpertiseListRes implements BaseResponse {
    message!: string;
    data!: ExpertiseDto[];
}

export class PositionRes implements BaseResponse {
    message!: string;
    data!: PositionDto;
}

export class ExpertiseRes implements BaseResponse {
    message!: string;
    data!: ExpertiseDto;
}

export class PositionDto {
    id!: number;
    name!: string;
    description!: string;
}

export class ExpertiseDto {
    id!: number;
    name!: string;
    description!: string;
}
