package com.medacore.demo.repository;

import com.medacore.demo.model.AppointmentSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.sql.Date;
import java.util.List;

public interface AppointmentScheduleRepository extends JpaRepository<AppointmentSchedule, Integer>, JpaSpecificationExecutor<AppointmentSchedule> {
    List<AppointmentSchedule> findByStaff_Id(Integer staffId);

    List<AppointmentSchedule> findByPatient_Account_Username(String patientUsername);

    Boolean existsByTimeAndTimeFrame(Date time, String timeFrame);

    Boolean existsByPatient_IdAndTime(Integer patientId, Date time);
}
