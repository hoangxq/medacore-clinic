import { AppointmentScheduleCriteria } from './../commons/dto/appointment-schedule';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { AppointmentScheduleListRes, AppointmentScheduleRes } from '../commons/dto/appointment-schedule';
import { BaseResponse } from '../commons/dto/response';
import { AppointmentScheduleReq } from '../commons/request/appointment-schedule.req';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentScheduleService {
    private baseURL = ROOT_API + "/appointment-schedule";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    private headers = this.authService.addTokenToHeader();

    getAllSchedules(): Observable<AppointmentScheduleListRes> {
        return this.httpClient.get<AppointmentScheduleListRes>(`${this.baseURL}`, { headers: this.headers });
    }

    getSchedules(appointmentScheduleCriteria: AppointmentScheduleCriteria): Observable<AppointmentScheduleListRes> {
        return this.httpClient.post<AppointmentScheduleListRes>(`${this.baseURL}/find`, appointmentScheduleCriteria, { headers: this.headers });
    }

    getScheduleById(scheduleId: number): Observable<AppointmentScheduleRes> {
        return this.httpClient.get<AppointmentScheduleRes>(`${this.baseURL}/get-schedule/${scheduleId}`, { headers: this.headers });
    }

    getScheduleOfDoctor(doctorId: number): Observable<AppointmentScheduleListRes> {
        return this.httpClient.get<AppointmentScheduleListRes>(`${this.baseURL}/get-schedule-of-doctor/${doctorId}`, { headers: this.headers });
    }

    getScheduleOfPatient(patientUsername: string, appointmentScheduleCriteria: AppointmentScheduleCriteria): Observable<AppointmentScheduleListRes> {
        return this.httpClient.post<AppointmentScheduleListRes>(
            `${this.baseURL}/get-schedule-of-patient/${patientUsername}`,
            appointmentScheduleCriteria,
            { headers: this.headers });
    }

    createSchedule(appointmentScheduleReq: AppointmentScheduleReq): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(`${this.baseURL}/create`, appointmentScheduleReq, { headers: this.headers });
    }

    updateSchedule(scheduleId: number, appointmentScheduleReq: AppointmentScheduleReq): Observable<BaseResponse> {
        return this.httpClient.put<BaseResponse>(`${this.baseURL}/update-schedule/${scheduleId}`, appointmentScheduleReq, { headers: this.headers });
    }

    removeSchedule(scheduleId: number): Observable<BaseResponse> {
        return this.httpClient.delete<BaseResponse>(`${this.baseURL}/delete-schedule/${scheduleId}`, { headers: this.headers });
    }
}

