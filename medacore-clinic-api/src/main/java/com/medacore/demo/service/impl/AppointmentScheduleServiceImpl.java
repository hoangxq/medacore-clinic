package com.medacore.demo.service.impl;

import com.medacore.demo.model.AppointmentSchedule;
import com.medacore.demo.model.Patient;
import com.medacore.demo.model.Staff;
import com.medacore.demo.repository.AppointmentScheduleRepository;
import com.medacore.demo.repository.PatientRepository;
import com.medacore.demo.repository.StaffRepository;
import com.medacore.demo.service.AppointmentScheduleService;
import com.medacore.demo.service.utils.MappingHelper;
import com.medacore.demo.web.dto.AppointmentScheduleDto;
import com.medacore.demo.web.dto.PatientDto;
import com.medacore.demo.web.dto.StaffDto;
import com.medacore.demo.web.dto.request.AppointmentScheduleCriteria;
import com.medacore.demo.web.dto.request.AppointmentScheduleReq;
import com.medacore.demo.web.exception.EntityNotFoundException;
import com.medacore.demo.web.exception.ServiceException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AppointmentScheduleServiceImpl implements AppointmentScheduleService {
    private final AppointmentScheduleRepository appointmentScheduleRepository;
    private final PatientRepository patientRepository;
    private final StaffRepository staffRepository;
    private final MappingHelper mappingHelper;

    @Override
    public void createAppointmentSchedule(AppointmentScheduleReq appointmentScheduleReq) {
        var patient = patientRepository.findById(appointmentScheduleReq.getPatientId())
                .orElseThrow(() -> new EntityNotFoundException(Patient.class.getName()
                        , appointmentScheduleReq.getPatientId().toString()));
        var staff = staffRepository.findById(appointmentScheduleReq.getStaffId())
                .orElseThrow(() -> new EntityNotFoundException(Staff.class.getName()
                        , appointmentScheduleReq.getStaffId().toString()));
        if (appointmentScheduleRepository
                .existsByTimeAndTimeFrame(appointmentScheduleReq.getTime(), appointmentScheduleReq.getTimeFrame()))
            throw new ServiceException("Khung thời gian này đã được đặt"
                    , "err.api.appointment-schedule-is-existed");
        if (appointmentScheduleRepository
                .existsByPatient_IdAndTime(appointmentScheduleReq.getPatientId(), appointmentScheduleReq.getTime()))
            throw new ServiceException("Một bệnh nhân chỉ có thể đăng ký được 1 lịch hẹn trong 1 ngày"
                    , "err.api.appointment-schedule-is-existed");
        var appointmentSchedule = mappingHelper.map(appointmentScheduleReq, AppointmentSchedule.class);
        appointmentSchedule.setPatient(patient);
        appointmentSchedule.setStaff(staff);
        appointmentScheduleRepository.save(appointmentSchedule);
    }

    @Override
    public List<AppointmentScheduleDto> getSchedules() {
        return appointmentScheduleRepository.findAll()
                .stream().map(e -> {
                    var res = mappingHelper.map(e, AppointmentScheduleDto.class);
                    res.setPatientDto(mappingHelper.map(e.getPatient(), PatientDto.class));
                    res.setStaffDto(mappingHelper.map(e.getStaff(), StaffDto.class));
                    return res;
                }).collect(Collectors.toList());
    }

    @Override
    public List<AppointmentScheduleDto> getScheduleOfDoctor(Integer doctorId) {
        return appointmentScheduleRepository.findByStaff_Id(doctorId)
                .stream().map(e -> {
                    var res = mappingHelper.map(e, AppointmentScheduleDto.class);
                    res.setPatientDto(mappingHelper.map(e.getPatient(), PatientDto.class));
                    res.setStaffDto(mappingHelper.map(e.getStaff(), StaffDto.class));
                    return res;
                }).collect(Collectors.toList());
    }

    @Override
    public List<AppointmentScheduleDto> getScheduleOfPatient(String patientUsername, AppointmentScheduleCriteria appointmentScheduleCriteria) {
        var spec = appointmentScheduleCriteria.toSpecification().and((root, query, criteriaBuilder)
                -> criteriaBuilder.equal(root.get("patient").get("account").get("username"), patientUsername));
        return appointmentScheduleRepository.findAll(spec)
                .stream()
                .map(e -> {
                    var res = mappingHelper.map(e, AppointmentScheduleDto.class);
                    res.setPatientDto(mappingHelper.map(e.getPatient(), PatientDto.class));
                    res.setStaffDto(mappingHelper.map(e.getStaff(), StaffDto.class));
                    return res;
                }).collect(Collectors.toList());
    }

    @Override
    public AppointmentScheduleDto getScheduleById(Integer scheduleId) {
        var schedule = appointmentScheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new EntityNotFoundException(AppointmentSchedule.class.getName()
                        , scheduleId.toString()));
        var res = mappingHelper.map(schedule, AppointmentScheduleDto.class);
        res.setPatientDto(mappingHelper.map(schedule.getPatient(), PatientDto.class));
        res.setStaffDto(mappingHelper.map(schedule.getStaff(), StaffDto.class));
        return res;
    }

    @Override
    public void updateSchedule(Integer scheduleId, AppointmentScheduleReq appointmentScheduleReq) {
        var schedule = appointmentScheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new EntityNotFoundException(AppointmentSchedule.class.getName()
                        , scheduleId.toString()));
        if (appointmentScheduleReq.getStaffId() != null) {
            var staff = staffRepository.findById(appointmentScheduleReq.getStaffId())
                    .orElseThrow(() -> new EntityNotFoundException(Staff.class.getName()
                            , appointmentScheduleReq.getStaffId().toString()));
            schedule.setStaff(staff);
        }
        if (appointmentScheduleReq.getPatientId() != null) {
            var patient = patientRepository.findById(appointmentScheduleReq.getPatientId())
                    .orElseThrow(() -> new EntityNotFoundException(Patient.class.getName()
                            , appointmentScheduleReq.getPatientId().toString()));
            schedule.setPatient(patient);
        }
        mappingHelper.mapIfSourceNotNullAndStringNotBlank(appointmentScheduleReq, schedule);
        appointmentScheduleRepository.save(schedule);
    }

    @Override
    public void deleteSchedule(Integer scheduleId) {
        appointmentScheduleRepository.deleteById(scheduleId);
    }

    @Override
    public List<AppointmentScheduleDto> getSchedulesByCriteria(AppointmentScheduleCriteria appointmentScheduleCriteria) {
        return appointmentScheduleRepository.findAll(appointmentScheduleCriteria.toSpecification())
                .stream().map(e -> {
                    var res = mappingHelper.map(e, AppointmentScheduleDto.class);
                    res.setPatientDto(mappingHelper.map(e.getPatient(), PatientDto.class));
                    res.setStaffDto(mappingHelper.map(e.getStaff(), StaffDto.class));
                    return res;
                }).collect(Collectors.toList());
    }
}