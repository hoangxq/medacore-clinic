package com.medacore.demo.web.rest;

import com.medacore.demo.service.MedicalExaminationTemplateService;
import com.medacore.demo.web.dto.request.MedicalExaminationTemplateReq;
import com.medacore.demo.web.dto.response.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/medical-examination-templates")
@CrossOrigin("*")
@RequiredArgsConstructor
public class MedicalExaminationTemplateResource {
    private final MedicalExaminationTemplateService medicalExaminationTemplateService;

    @PostMapping
    public ResponseEntity<?> createTemplate(@RequestBody @Valid MedicalExaminationTemplateReq medicalExaminationTemplateReq) {
        medicalExaminationTemplateService.createTemplate(medicalExaminationTemplateReq);
        return ResponseUtils.created();
    }

    @GetMapping("/common")
    public ResponseEntity<?> getTemplatesCommon() {
        return ResponseUtils.ok(medicalExaminationTemplateService.getTemplates());
    }

    @GetMapping("/template-of-doctor/{doctorUsername}")
    public ResponseEntity<?> getTemplatesOfDoctor(@PathVariable String doctorUsername) {
        return ResponseUtils.ok(medicalExaminationTemplateService.getTemplatesOfDoctor(doctorUsername));
    }

    @GetMapping("/{templateId}")
    public ResponseEntity<?> getTemplate(@PathVariable Integer templateId) {
        return ResponseUtils.ok(medicalExaminationTemplateService.getTemplate(templateId));
    }

    @PutMapping("/{templateId}")
    public ResponseEntity<?> updateTemplate(@PathVariable Integer templateId, @RequestBody MedicalExaminationTemplateReq medicalExaminationTemplateReq) {
        medicalExaminationTemplateService.updateTemplate(templateId, medicalExaminationTemplateReq);
        return ResponseUtils.ok("Updated");
    }

    @DeleteMapping("/{templateId}")
    public ResponseEntity<?> removeTemplate(@PathVariable Integer templateId) {
        medicalExaminationTemplateService.removeTemplate(templateId);
        return ResponseUtils.ok("Removed");
    }
}
