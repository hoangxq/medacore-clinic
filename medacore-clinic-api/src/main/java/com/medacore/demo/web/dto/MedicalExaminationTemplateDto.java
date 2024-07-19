package com.medacore.demo.web.dto;

import lombok.Data;

@Data
public class MedicalExaminationTemplateDto {
    private Integer id;
    private String name;
    private String description;
    private StaffDto staffDto;
}
