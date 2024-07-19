package com.medacore.demo.service;

import com.medacore.demo.web.dto.MedicineDto;
import com.medacore.demo.web.dto.request.MedicineCriteria;
import com.medacore.demo.web.dto.request.MedicineReq;

import java.util.List;

public interface MedicineService {
    void createMedicine(MedicineReq medicineReq);

    List<MedicineDto> getListMedicine(MedicineCriteria medicineCriteria);

    MedicineDto getMedicine(Integer medicineId);

    void updateMedicine(Integer medicineId, MedicineReq medicineReq);

    void removeMedicine(Integer medicineId);
}
