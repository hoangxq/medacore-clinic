package com.medacore.demo.web.rest;

import com.medacore.demo.service.AppointmentScheduleService;
import com.medacore.demo.web.dto.request.AppointmentScheduleCriteria;
import com.medacore.demo.web.dto.request.AppointmentScheduleReq;
import com.medacore.demo.web.dto.response.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointment-schedule")
@CrossOrigin("*")
@RequiredArgsConstructor
public class AppointmentScheduleResource {
    private final AppointmentScheduleService appointmentScheduleService;

    @PostMapping("/create")
    public ResponseEntity<?> createAppointmentSchedule(@RequestBody AppointmentScheduleReq appointmentScheduleReq) {
        appointmentScheduleService.createAppointmentSchedule(appointmentScheduleReq);
        return ResponseUtils.created();
    }

    @GetMapping
    public ResponseEntity<?> getSchedules() {
        return ResponseUtils.ok(appointmentScheduleService.getSchedules());
    }

    @PostMapping("/find")
    public ResponseEntity<?> getSchedulesByCriteria(@RequestBody AppointmentScheduleCriteria appointmentScheduleCriteria) {
        return ResponseUtils.ok(appointmentScheduleService.getSchedulesByCriteria(appointmentScheduleCriteria));
    }

    @GetMapping("/get-schedule-of-doctor/{doctorId}")
    public ResponseEntity<?> getScheduleOfDoctor(@PathVariable Integer doctorId) {
        return ResponseUtils.ok(appointmentScheduleService.getScheduleOfDoctor(doctorId));
    }

    @PostMapping("/get-schedule-of-patient/{patientUsername}")
    public ResponseEntity<?> getScheduleOfPatient(@PathVariable String patientUsername, @RequestBody AppointmentScheduleCriteria appointmentScheduleCriteria) {
        return ResponseUtils.ok(appointmentScheduleService.getScheduleOfPatient(patientUsername, appointmentScheduleCriteria));
    }

    @GetMapping("/get-schedule/{scheduleId}")
    public ResponseEntity<?> getScheduleById(@PathVariable Integer scheduleId) {
        return ResponseUtils.ok(appointmentScheduleService.getScheduleById(scheduleId));
    }

    @PutMapping("/update-schedule/{scheduleId}")
    public ResponseEntity<?> updateSchedule(@PathVariable Integer scheduleId
            , @RequestBody AppointmentScheduleReq appointmentScheduleReq) {
        appointmentScheduleService.updateSchedule(scheduleId, appointmentScheduleReq);
        return ResponseUtils.ok("Updated");
    }

    @DeleteMapping("/delete-schedule/{scheduleId}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Integer scheduleId) {
        appointmentScheduleService.deleteSchedule(scheduleId);
        return ResponseUtils.ok("Updated");
    }
}
