import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { MedicineListRes, MedicineRes } from '../commons/dto/medicine';
import { BaseResponse } from '../commons/dto/response';
import { MedicineCriteria, MedicineReq } from '../commons/request/medicines.req';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class MedicineService {
    private baseURL = ROOT_API + "/medicine";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    private headers = this.authService.addTokenToHeader();

    getAllMedicine(medicineCriteria: MedicineCriteria): Observable<MedicineListRes> {
        return this.httpClient.post<MedicineListRes>(`${this.baseURL}`, medicineCriteria, { headers: this.headers });
    }

    getMedicineById(MedicineId: number): Observable<MedicineRes> {
        return this.httpClient.get<MedicineRes>(`${this.baseURL}/${MedicineId}`, { headers: this.headers });
    }

    createMedicine(MedicineReq: MedicineReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}/create-medicine`, MedicineReq, { headers: this.headers });
    }

    updateMedicine(MedicineId: number, MedicineReq: MedicineReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/${MedicineId}`, MedicineReq, { headers: this.headers });
    }

    removeMedicine(MedicineId: number): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${MedicineId}`, { headers: this.headers });
    }
}

