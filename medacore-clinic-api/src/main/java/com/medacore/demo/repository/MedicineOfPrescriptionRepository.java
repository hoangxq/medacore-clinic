package com.medacore.demo.repository;

import com.medacore.demo.model.MedicineOfPrescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineOfPrescriptionRepository extends JpaRepository<MedicineOfPrescription, Integer> {
    List<MedicineOfPrescription> findByPrescription_Id(Integer prescriptionId);
}
