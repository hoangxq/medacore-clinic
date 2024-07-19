package com.medacore.demo.service;

import com.medacore.demo.web.dto.AccountDto;
import com.medacore.demo.web.dto.PatientDto;
import com.medacore.demo.web.dto.StaffDto;
import com.medacore.demo.web.dto.request.PatientCriteria;
import com.medacore.demo.web.dto.request.PatientReq;
import com.medacore.demo.web.dto.request.StaffCriteria;
import com.medacore.demo.web.dto.request.StaffReq;

import java.util.List;

public interface UserService {
    List<AccountDto> getAllAccounts();

    List<PatientDto> getCustomPatients(PatientCriteria patientCriteria);

    List<StaffDto> getCustomStaff(StaffCriteria staffCriteria);

    PatientDto getPatient(Integer patientId);

    StaffDto getStaff(Integer staffId);

    void updatePatient(Integer patientId, PatientReq patientReq);

    void updateStaff(Integer staffId, StaffReq staffReq);

    PatientDto getPatientByUsername(String username);

    StaffDto getStaffByUsername(String username);
}
