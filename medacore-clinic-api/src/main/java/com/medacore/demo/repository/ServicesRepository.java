package com.medacore.demo.repository;

import com.medacore.demo.model.Services;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServicesRepository extends JpaRepository<Services, Integer> {
    List<Services> findByDepartment_Id(Integer departmentId);
}
