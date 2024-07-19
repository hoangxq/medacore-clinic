package com.medacore.demo.web.dto;

import com.medacore.demo.model.MedicalDepartment;
import lombok.Data;

@Data
public class ServicesDto {
    private Integer id;
    private String name;
    private Float price;
    private String description;
    private MedicalDepartment department;
}
