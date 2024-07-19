package com.medacore.demo.service;

import com.medacore.demo.model.MedicalDepartment;
import com.medacore.demo.web.dto.request.MedicalDepartmentReq;

import java.util.List;

public interface MedicalDepartmentService {
    void createMedicalDepartment(MedicalDepartmentReq medicalDepartmentReq);

    List<MedicalDepartment> getListMedicalDepartment();

    MedicalDepartment getMedicalDepartment(Integer medicalDepartmentId);

    void updateMedicalDepartment(Integer medicalDepartmentId, MedicalDepartmentReq medicalDepartmentReq);

    void removeMedicalDepartment(Integer medicalDepartmentId);
}
