import { BaseResponse } from "./response";

export class MedicineDto {
    id!: number;
    name!: string;
    useManual!: string;
    unit!: string;
    quantity!: number;
    price!: number;
    activeElement!: string;
    content!: string;
    using!: string;
    packing!: string;
    productionUnit!: string;
    declaringUnit!: string;
}

export class MedicineListRes implements BaseResponse {
    message!: string;
    data!: MedicineDto[];
}

export class MedicineRes implements BaseResponse {
    message!: string;
    data!: MedicineDto;
}