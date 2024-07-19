package com.medacore.demo.web.dto;

import lombok.Data;

@Data
public class ServicesOfMedicalTestDto {
    private Integer id;
    private ServicesDto serviceDto;
    private Integer quantity;
}