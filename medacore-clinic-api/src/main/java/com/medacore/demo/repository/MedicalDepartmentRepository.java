package com.medacore.demo.repository;

import com.medacore.demo.model.MedicalDepartment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalDepartmentRepository extends JpaRepository<MedicalDepartment, Integer> {
}
