package com.medacore.demo.web.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class MedicalExaminationTemplateReq {
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    private String staffUsername;
}
