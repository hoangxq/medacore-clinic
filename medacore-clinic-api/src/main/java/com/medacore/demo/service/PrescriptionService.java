package com.medacore.demo.service;

import com.medacore.demo.web.dto.PrescriptionDto;
import com.medacore.demo.web.dto.request.PrescriptionReq;

public interface PrescriptionService {
    void createPrescription(PrescriptionReq prescriptionReq);

    PrescriptionDto getPrescriptionById(Integer prescriptionId);

    PrescriptionDto getPrescriptionOfMedicalRecord(Integer medicalRecordId);
}
