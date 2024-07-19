package com.medacore.demo.repository;

import com.medacore.demo.model.MedicalExaminationTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MedicalExaminationTemplateRepository extends JpaRepository<MedicalExaminationTemplate, Integer>, JpaSpecificationExecutor<MedicalExaminationTemplate> {
}
