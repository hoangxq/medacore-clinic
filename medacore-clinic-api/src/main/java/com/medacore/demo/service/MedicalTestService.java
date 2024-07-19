package com.medacore.demo.service;

import com.medacore.demo.web.dto.MedicalTestDto;
import com.medacore.demo.web.dto.request.MedicalTestReq;

public interface MedicalTestService {
    void createMedicalTest(MedicalTestReq medicalTestReq);

    MedicalTestDto getByMedicalRecord(Integer medicalRecordId);
}
