import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { MedicalTestRes } from '../commons/dto/medical-test';
import { BaseResponse } from '../commons/dto/response';
import { MedicalTestReq } from './../commons/request/medical-test.req';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class MedicalTestService {
    private baseURL = ROOT_API + "/medical-test";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    private headers = this.authService.addTokenToHeader();

    createMedicalTest(medicalTestReq: MedicalTestReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, medicalTestReq, { headers: this.headers });
    }

    getByMedicalRecord(medicalRecordId: number): Observable<MedicalTestRes> {
        return this.httpClient.get<MedicalTestRes>(`${this.baseURL}/get-by-medical-record/${medicalRecordId}`, { headers: this.headers });
    }
}

