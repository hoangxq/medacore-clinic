package com.medacore.demo.web.dto.request;

import lombok.Data;

@Data
public class MedicalRecordReq {
    private Integer patientId;
    private Integer staffId;
}