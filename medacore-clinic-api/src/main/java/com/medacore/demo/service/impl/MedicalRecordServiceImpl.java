package com.medacore.demo.service.impl;

import com.medacore.demo.model.MedicalRecord;
import com.medacore.demo.model.MedicalRecordInformation;
import com.medacore.demo.model.Patient;
import com.medacore.demo.model.Staff;
import com.medacore.demo.model.constants.MedicalRecordStatus;
import com.medacore.demo.model.constants.PaymentStatus;
import com.medacore.demo.repository.MedicalRecordInfoRepository;
import com.medacore.demo.repository.MedicalRecordRepository;
import com.medacore.demo.repository.PatientRepository;
import com.medacore.demo.repository.StaffRepository;
import com.medacore.demo.service.MedicalRecordService;
import com.medacore.demo.service.utils.MappingHelper;
import com.medacore.demo.web.dto.MedicalRecordDto;
import com.medacore.demo.web.dto.MedicalRecordInfoDto;
import com.medacore.demo.web.dto.PatientDto;
import com.medacore.demo.web.dto.StaffDto;
import com.medacore.demo.web.dto.request.MedicalRecordCriteria;
import com.medacore.demo.web.dto.request.MedicalRecordInfoReq;
import com.medacore.demo.web.dto.request.MedicalRecordReq;
import com.medacore.demo.web.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MedicalRecordServiceImpl implements MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;
    private final MedicalRecordInfoRepository medicalRecordInfoRepository;
    private final PatientRepository patientRepository;
    private final StaffRepository staffRepository;
    private final MappingHelper mappingHelper;

    @Override
    public MedicalRecordDto getMedicalRecordById(Integer medicalRecordId) {
        var medicalRecord = medicalRecordRepository.findById(medicalRecordId)
                .orElseThrow(() -> new EntityNotFoundException(MedicalRecord.class.getName()
                        , medicalRecordId.toString()));
        var res = mappingHelper.map(medicalRecord, MedicalRecordDto.class);
        res.setPatientDto(mappingHelper.map(medicalRecord.getPatient(), PatientDto.class));
        res.setStaffDto(mappingHelper.map(medicalRecord.getStaff(), StaffDto.class));
        return res;
    }

    @Override
    public void createMedicalRecord(MedicalRecordReq medicalRecordReq) {
        var patient = patientRepository.findById(medicalRecordReq.getPatientId())
                .orElseThrow(() -> new EntityNotFoundException(Patient.class.getName()
                        , medicalRecordReq.getPatientId().toString()));
        var staff = staffRepository.findById(medicalRecordReq.getStaffId())
                .orElseThrow(() -> new EntityNotFoundException(Staff.class.getName()
                        , medicalRecordReq.getStaffId().toString()));
        var medicalRecord = mappingHelper.map(medicalRecordReq, MedicalRecord.class);
        medicalRecord.setPatient(patient);
        medicalRecord.setStaff(staff);
        medicalRecord.setTime(LocalDateTime.now());
        medicalRecord.setStatus(MedicalRecordStatus.ARRIVED);
        medicalRecord.setPaymentStatus(PaymentStatus.UNPAID);
        medicalRecordRepository.save(medicalRecord);
    }

    @Override
    public List<MedicalRecordDto> getMedicalRecords(MedicalRecordCriteria medicalRecordCriteria) {
        return medicalRecordRepository.findAll(medicalRecordCriteria.toSpecification())
                .stream().map(e -> {
                    var res = mappingHelper.map(e, MedicalRecordDto.class);
                    res.setPatientDto(mappingHelper.map(e.getPatient(), PatientDto.class));
                    res.setStaffDto(mappingHelper.map(e.getStaff(), StaffDto.class));
                    return res;
                }).collect(Collectors.toList());
    }

    @Override
    public void createMedicalRecordInfo(MedicalRecordInfoReq medicalRecordReq) {
        var dataInfo = medicalRecordInfoRepository.findByMedicalRecord_Id(medicalRecordReq.getMedicalRecordId())
                .orElseGet(() -> {
                    MedicalRecordInformation res = new MedicalRecordInformation();
                    var medicalRecord = medicalRecordRepository.findById(medicalRecordReq.getMedicalRecordId())
                            .orElseThrow(() -> new EntityNotFoundException(MedicalRecord.class.getName()
                                    , medicalRecordReq.getMedicalRecordId().toString()));
                    res.setMedicalRecord(medicalRecord);
                    return res;
                });
        mappingHelper.mapIfSourceNotNullAndStringNotBlank(medicalRecordReq, dataInfo);
        medicalRecordInfoRepository.save(dataInfo);
    }

    @Override
    public List<MedicalRecordDto> getMedicalRecordsOfDoctor(String doctorUsername, MedicalRecordCriteria medicalRecordCriteria) {
        var spec = medicalRecordCriteria.toSpecification().and((root, query, criteriaBuilder)
                -> criteriaBuilder.equal(root.get("staff").get("account").get("username"), doctorUsername));
        return medicalRecordRepository.findAll(spec)
                .stream().map(e -> {
                    var res = mappingHelper.map(e, MedicalRecordDto.class);
                    res.setPatientDto(mappingHelper.map(e.getPatient(), PatientDto.class));
                    res.setStaffDto(mappingHelper.map(e.getStaff(), StaffDto.class));
                    return res;
                }).collect(Collectors.toList());
    }

    @Override
    public MedicalRecordInfoDto getMedicalRecordInfo(Integer medicalRecordId) {
        var dataInfo = medicalRecordInfoRepository.findByMedicalRecord_Id(medicalRecordId)
                .orElseThrow(() -> new EntityNotFoundException(MedicalRecordInformation.class.getName(),
                        medicalRecordId.toString()));
        var medicalRecordDto = mappingHelper.map(dataInfo.getMedicalRecord(), MedicalRecordDto.class);
        medicalRecordDto.setPatientDto(mappingHelper.map(dataInfo.getMedicalRecord().getPatient(), PatientDto.class));
        medicalRecordDto.setStaffDto(mappingHelper.map(dataInfo.getMedicalRecord().getStaff(), StaffDto.class));
        var res = mappingHelper.map(dataInfo, MedicalRecordInfoDto.class);
        res.setMedicalRecordDto(medicalRecordDto);
        return res;
    }

    @Override
    public void updateStatus(Integer medicalRecordId, String status) {
        var medicalRecord = medicalRecordRepository.findById(medicalRecordId)
                .orElseThrow(() -> new EntityNotFoundException(MedicalRecord.class.getName()
                        , medicalRecordId.toString()));
        medicalRecord.setStatus(status);
        medicalRecordRepository.save(medicalRecord);
    }

    @Override
    public List<MedicalRecordDto> getMedicalRecordsOfPatient(String patientUsername) {
        return medicalRecordRepository.findByPatient_Account_Username(patientUsername)
                .stream().map(e -> {
                    var res = mappingHelper.map(e, MedicalRecordDto.class);
                    res.setPatientDto(mappingHelper.map(e.getPatient(), PatientDto.class));
                    res.setStaffDto(mappingHelper.map(e.getStaff(), StaffDto.class));
                    return res;
                }).collect(Collectors.toList());
    }

    @Override
    public void updatePaymentStatus(Integer medicalRecordId, String paymentStatus) {
        var medicalRecord = medicalRecordRepository.findById(medicalRecordId)
                .orElseThrow(() -> new EntityNotFoundException(MedicalRecord.class.getName()
                        , medicalRecordId.toString()));
        medicalRecord.setPaymentStatus(paymentStatus);
        medicalRecordRepository.save(medicalRecord);
    }
}
