package com.medacore.demo.service;

import com.medacore.demo.web.dto.MedicalExaminationTemplateDto;
import com.medacore.demo.web.dto.request.MedicalExaminationTemplateReq;

import java.util.List;

public interface MedicalExaminationTemplateService {
    void createTemplate(MedicalExaminationTemplateReq medicalExaminationTemplateReq);

    List<MedicalExaminationTemplateDto> getTemplates();

    List<MedicalExaminationTemplateDto> getTemplatesOfDoctor(String doctorUsername);

    MedicalExaminationTemplateDto getTemplate(Integer templateId);

    void updateTemplate(Integer templateId, MedicalExaminationTemplateReq medicalExaminationTemplateReq);

    void removeTemplate(Integer templateId);
}
