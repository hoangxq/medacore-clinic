import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { PositionListRes, PositionRes } from '../commons/dto/position-expertise';
import { BaseResponse } from '../commons/dto/response';
import { PatientReq } from '../commons/request/patient.req';
import { PositionReq } from '../commons/request/position-expertise.req';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    private baseURL = ROOT_API + "/position";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    private headers = this.authService.addTokenToHeader();

    getAllPosition(): Observable<PositionListRes> {
        return this.httpClient.get<PositionListRes>(`${this.baseURL}`, { headers: this.headers });
    }

    getPositionById(positionId: number): Observable<PositionRes> {
        return this.httpClient.get<PositionRes>(`${this.baseURL}/${positionId}`, { headers: this.headers });
    }

    createPosition(positionReq: PositionReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, positionReq, { headers: this.headers });
    }

    updatePosition(positionId: number, positionReq: PositionReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/${positionId}`, positionReq, { headers: this.headers });
    }

    removePosition(positionId: number, patientReq: PatientReq): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${positionId}`, { headers: this.headers });
    }
}

