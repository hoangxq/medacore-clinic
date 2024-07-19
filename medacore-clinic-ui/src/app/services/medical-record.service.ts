import { MedicalRecordCriteria } from './../commons/dto/medical-record';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { MedicalRecordInfoRes, MedicalRecordListRes, MedicalRecordRes } from '../commons/dto/medical-record';
import { BaseResponse } from '../commons/dto/response';
import { MedicalRecordInfoReq, MedicalRecordReq } from '../commons/request/medical-record.req';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class MedicalRecordService {
    private baseURL = ROOT_API + "/medical-record";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    private headers = this.authService.addTokenToHeader();


    getAllMedicalRecords(medicalRecordCriteria: MedicalRecordCriteria): Observable<MedicalRecordListRes> {
        return this.httpClient.post<MedicalRecordListRes>(`${this.baseURL}`, medicalRecordCriteria, { headers: this.headers });
    }

    getAllMedicalRecordsOfDoctor(doctorUsername: string, medicalRecordCriteria: MedicalRecordCriteria): Observable<MedicalRecordListRes> {
        return this.httpClient.post<MedicalRecordListRes>(`${this.baseURL}/doctor/${doctorUsername}`, medicalRecordCriteria, { headers: this.headers });
    }

    getAllMedicalRecordsOfPatient(patientUsername: string): Observable<MedicalRecordListRes> {
        return this.httpClient.get<MedicalRecordListRes>(`${this.baseURL}/patient/${patientUsername}`, { headers: this.headers });
    }

    getMedicalRecordById(medicalRecordId: number): Observable<MedicalRecordRes> {
        return this.httpClient.get<MedicalRecordRes>(`${this.baseURL}/${medicalRecordId}`, { headers: this.headers });
    }

    createMedicalRecord(medicalRecordReq: MedicalRecordReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}/create-medical-record`, medicalRecordReq, { headers: this.headers });
    }

    updateStatus(medicalRecordId: number, status: string): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/update-status/${medicalRecordId}`, status, { headers: this.headers });
    }

    updatePaymentStatus(medicalRecordId: number, paymentStatus: string): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/update-payment-status/${medicalRecordId}`, paymentStatus, { headers: this.headers });
    }

    removeMedicalRecord(medicalRecordId: number): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${medicalRecordId}`, { headers: this.headers });
    }

    createMedicalRecordInfo(medicalRecordInfoReq: MedicalRecordInfoReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}/create-medical-record-info`, medicalRecordInfoReq, { headers: this.headers });
    }

    getMedicalRecordInfo(medicalRecordId: number): Observable<MedicalRecordInfoRes> {
        return this.httpClient.get<MedicalRecordInfoRes>(`${this.baseURL}/info/${medicalRecordId}`, { headers: this.headers });
    }
}

