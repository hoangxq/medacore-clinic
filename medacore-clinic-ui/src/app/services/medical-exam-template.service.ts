import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { MedicalExamTemplateListRes, MedicalExamTemplateReq, MedicalExamTemplateRes } from '../commons/dto/medical-exam-template';
import { BaseResponse } from '../commons/dto/response';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class MedicalExamTemplateService {
    private baseURL = ROOT_API + "/medical-examination-templates";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    private headers = this.authService.addTokenToHeader();

    getTemplatesCommon(): Observable<MedicalExamTemplateListRes> {
        return this.httpClient.get<MedicalExamTemplateListRes>(`${this.baseURL}/common`, { headers: this.headers });
    }

    getTemplatesOfDoctor(doctorUsername: string): Observable<MedicalExamTemplateListRes> {
        return this.httpClient.get<MedicalExamTemplateListRes>(`${this.baseURL}/template-of-doctor/${doctorUsername}`, { headers: this.headers });
    }

    getTemplateById(templateId: number): Observable<MedicalExamTemplateRes> {
        return this.httpClient.get<MedicalExamTemplateRes>(`${this.baseURL}/${templateId}`, { headers: this.headers });
    }

    createTemplate(medicalExamTemplateReq: MedicalExamTemplateReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}`, medicalExamTemplateReq, { headers: this.headers });
    }

    updateTemplate(templateId: number, medicalExamTemplateReq: MedicalExamTemplateReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/${templateId}`, medicalExamTemplateReq, { headers: this.headers });
    }

    removeTemplate(templateId: number): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/${templateId}`, { headers: this.headers });
    }
}

