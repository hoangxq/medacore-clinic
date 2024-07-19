import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { BaseResponse } from '../commons/dto/response';
import { ServicesListRes, ServicesRes } from '../commons/dto/services';
import { PatientReq } from '../commons/request/patient.req';
import { ServicesReq } from '../commons/request/services.req';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    private baseURL = ROOT_API + "/services";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    private headers = this.authService.addTokenToHeader();

    getAllServices(): Observable<ServicesListRes> {
        return this.httpClient.get<ServicesListRes>(`${this.baseURL}`, { headers: this.headers });
    }

    getServicesById(ServicesId: number): Observable<ServicesRes> {
        return this.httpClient.get<ServicesRes>(`${this.baseURL}/${ServicesId}`, { headers: this.headers });
    }

    getServicesByDepartment(departmentId: number): Observable<ServicesListRes> {
        return this.httpClient.get<ServicesListRes>(`${this.baseURL}/get-by-department/${departmentId}`, { headers: this.headers });
    }

    createServices(servicesReq: ServicesReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, servicesReq, { headers: this.headers });
    }

    updateServices(servicesId: number, servicesReq: ServicesReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/${servicesId}`, servicesReq, { headers: this.headers });
    }

    removeServices(servicesId: number, patientReq: PatientReq): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${servicesId}`, { headers: this.headers });
    }
}

