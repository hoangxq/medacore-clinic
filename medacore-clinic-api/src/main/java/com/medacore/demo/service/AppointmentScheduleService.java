package com.medacore.demo.service;

import com.medacore.demo.web.dto.AppointmentScheduleDto;
import com.medacore.demo.web.dto.request.AppointmentScheduleCriteria;
import com.medacore.demo.web.dto.request.AppointmentScheduleReq;

import java.util.List;

public interface AppointmentScheduleService {
    void createAppointmentSchedule(AppointmentScheduleReq appointmentScheduleReq);

    List<AppointmentScheduleDto> getSchedules();

    List<AppointmentScheduleDto> getScheduleOfDoctor(Integer doctorId);

    List<AppointmentScheduleDto> getScheduleOfPatient(String patientUsername, AppointmentScheduleCriteria appointmentScheduleCriteria);

    AppointmentScheduleDto getScheduleById(Integer scheduleId);

    void updateSchedule(Integer scheduleId, AppointmentScheduleReq appointmentScheduleReq);

    void deleteSchedule(Integer scheduleId);

    List<AppointmentScheduleDto> getSchedulesByCriteria(AppointmentScheduleCriteria appointmentScheduleCriteria);
}
