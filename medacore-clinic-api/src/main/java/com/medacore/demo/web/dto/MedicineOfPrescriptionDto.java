package com.medacore.demo.web.dto;

import lombok.Data;

@Data
public class MedicineOfPrescriptionDto {
    private Integer id;
    private MedicineDto medicineDto;
    private Integer quantity;
}
