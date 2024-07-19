import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { ExpertiseListRes, ExpertiseRes } from '../commons/dto/position-expertise';
import { BaseResponse } from '../commons/dto/response';
import { PatientReq } from '../commons/request/patient.req';
import { ExpertiseReq } from '../commons/request/position-expertise.req';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ExpertiseService {
    private baseURL = ROOT_API + "/expertise";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    private headers = this.authService.addTokenToHeader();

    getAllExpertise(): Observable<ExpertiseListRes> {
        return this.httpClient.get<ExpertiseListRes>(`${this.baseURL}`, { headers: this.headers });
    }

    getExpertiseById(ExpertiseId: number): Observable<ExpertiseRes> {
        return this.httpClient.get<ExpertiseRes>(`${this.baseURL}/${ExpertiseId}`, { headers: this.headers });
    }

    createExpertise(ExpertiseReq: ExpertiseReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, ExpertiseReq, { headers: this.headers });
    }

    updateExpertise(ExpertiseId: number, ExpertiseReq: ExpertiseReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/${ExpertiseId}`, ExpertiseReq, { headers: this.headers });
    }

    removeExpertise(ExpertiseId: number, patientReq: PatientReq): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${ExpertiseId}`, { headers: this.headers });
    }
}

