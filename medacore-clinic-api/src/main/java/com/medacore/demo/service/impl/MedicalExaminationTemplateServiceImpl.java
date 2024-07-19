package com.medacore.demo.service.impl;

import com.medacore.demo.model.MedicalExaminationTemplate;
import com.medacore.demo.model.Staff;
import com.medacore.demo.repository.MedicalExaminationTemplateRepository;
import com.medacore.demo.repository.StaffRepository;
import com.medacore.demo.service.MedicalExaminationTemplateService;
import com.medacore.demo.service.utils.MappingHelper;
import com.medacore.demo.web.dto.MedicalExaminationTemplateDto;
import com.medacore.demo.web.dto.StaffDto;
import com.medacore.demo.web.dto.request.MedicalExaminationTemplateReq;
import com.medacore.demo.web.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MedicalExaminationTemplateServiceImpl implements MedicalExaminationTemplateService {
    private final MedicalExaminationTemplateRepository medicalExaminationTemplateRepository;
    private final StaffRepository staffRepository;
    private final MappingHelper mappingHelper;

    @Override
    public void createTemplate(MedicalExaminationTemplateReq medicalExaminationTemplateReq) {
        var template = mappingHelper.map(medicalExaminationTemplateReq, MedicalExaminationTemplate.class);
        if (medicalExaminationTemplateReq.getStaffUsername() != null) {
            var staff = staffRepository.findByAccount_Username(medicalExaminationTemplateReq.getStaffUsername())
                    .orElseThrow(() -> new EntityNotFoundException(
                            Staff.class.getName(), medicalExaminationTemplateReq.getStaffUsername()));
            template.setStaff(staff);
        }
        medicalExaminationTemplateRepository.save(template);
    }

    @Override
    public List<MedicalExaminationTemplateDto> getTemplates() {
        return medicalExaminationTemplateRepository
                .findAll(toSpecification(null))
                .stream()
                .map(e -> {
                    var res = mappingHelper.map(e, MedicalExaminationTemplateDto.class);
                    if (e.getStaff() != null)
                        res.setStaffDto(mappingHelper.map(e.getStaff(), StaffDto.class));
                    return res;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicalExaminationTemplateDto> getTemplatesOfDoctor(String doctorUsername) {
        var spec = toSpecification(doctorUsername);
        return medicalExaminationTemplateRepository
                .findAll(spec)
                .stream()
                .map(e -> {
                    var res = mappingHelper.map(e, MedicalExaminationTemplateDto.class);
                    if (e.getStaff() != null)
                        res.setStaffDto(mappingHelper.map(e.getStaff(), StaffDto.class));
                    return res;
                })
                .collect(Collectors.toList());
    }

    @Override
    public MedicalExaminationTemplateDto getTemplate(Integer templateId) {
        return medicalExaminationTemplateRepository
                .findById(templateId)
                .map(e -> {
                    var res = mappingHelper.map(e, MedicalExaminationTemplateDto.class);
                    if (e.getStaff() != null)
                        res.setStaffDto(mappingHelper.map(e.getStaff(), StaffDto.class));
                    return res;
                })
                .orElseThrow(() -> new EntityNotFoundException(
                        MedicalExaminationTemplate.class.getName(),
                        templateId.toString()));
    }

    @Override
    public void updateTemplate(Integer templateId, MedicalExaminationTemplateReq medicalExaminationTemplateReq) {
        var template = medicalExaminationTemplateRepository
                .findById(templateId)
                .orElseThrow(() -> new EntityNotFoundException(
                        MedicalExaminationTemplate.class.getName(),
                        templateId.toString()));
        mappingHelper.mapIfSourceNotNullAndStringNotBlank(medicalExaminationTemplateReq, template);

        if (medicalExaminationTemplateReq.getStaffUsername() != null) {
            var staff = staffRepository.findByAccount_Username(medicalExaminationTemplateReq.getStaffUsername())
                    .orElseThrow(() -> new EntityNotFoundException(
                            Staff.class.getName(), medicalExaminationTemplateReq.getStaffUsername()));
            template.setStaff(staff);
        }
        medicalExaminationTemplateRepository.save(template);
    }

    @Override
    public void removeTemplate(Integer templateId) {
        medicalExaminationTemplateRepository.deleteById(templateId);
    }

    private Specification<MedicalExaminationTemplate> toSpecification(String doctorUsername) {
        return ((root, query, criteriaBuilder) -> {
            var staffJoin = root.join("staff", JoinType.LEFT);
            var accountJoin = staffJoin.join("account", JoinType.LEFT);

            Predicate staffNull = criteriaBuilder.isNull(root.get("staff"));
            Predicate doctorUsernameEqual = criteriaBuilder.equal(accountJoin.get("username"), doctorUsername);

            return criteriaBuilder.or(staffNull, doctorUsernameEqual);
        });
    }
}
