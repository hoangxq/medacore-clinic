import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { PrescriptionRes } from '../commons/dto/prescription';
import { BaseResponse } from '../commons/dto/response';
import { PrescriptionReq } from '../commons/request/prescription.req';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PrescriptionService {
    private baseURL = ROOT_API + "/prescription";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    private headers = this.authService.addTokenToHeader();

    createPrescription(prescriptionReq: PrescriptionReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}/create`, prescriptionReq, { headers: this.headers });
    }

    getPrescriptionOfMedicalRecord(medicalRecordId: number): Observable<PrescriptionRes> {
        return this.httpClient.get<PrescriptionRes>(`${this.baseURL}/prescription-of-medical-record/${medicalRecordId}`, { headers: this.headers });
    }
}