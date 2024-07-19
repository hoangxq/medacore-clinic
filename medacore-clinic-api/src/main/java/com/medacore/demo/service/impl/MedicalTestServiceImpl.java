package com.medacore.demo.service.impl;

import com.medacore.demo.model.MedicalRecord;
import com.medacore.demo.model.MedicalTest;
import com.medacore.demo.model.Services;
import com.medacore.demo.model.ServicesOfMedicalTest;
import com.medacore.demo.repository.MedicalRecordRepository;
import com.medacore.demo.repository.MedicalTestRepository;
import com.medacore.demo.repository.ServicesOfMedicalTestRepository;
import com.medacore.demo.repository.ServicesRepository;
import com.medacore.demo.service.MedicalTestService;
import com.medacore.demo.service.utils.MappingHelper;
import com.medacore.demo.web.dto.MedicalTestDto;
import com.medacore.demo.web.dto.ServicesDto;
import com.medacore.demo.web.dto.ServicesOfMedicalTestDto;
import com.medacore.demo.web.dto.request.MedicalTestReq;
import com.medacore.demo.web.dto.request.ServicesOfMedicalTestReq;
import com.medacore.demo.web.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MedicalTestServiceImpl implements MedicalTestService {
    private final MedicalTestRepository medicalTestRepository;
    private final ServicesRepository servicesRepository;
    private final ServicesOfMedicalTestRepository servicesOfMedicalTestRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final MappingHelper mappingHelper;

    @Override
    public void createMedicalTest(MedicalTestReq medicalTestReq) {
        if (medicalTestRepository.findByMedicalRecord_Id(medicalTestReq.getMedicalRecordId()).isPresent()) {
            deleteOldData(medicalTestReq);
        }
        var medicalRecord = medicalRecordRepository.findById(medicalTestReq.getMedicalRecordId())
                .orElseThrow(() -> new EntityNotFoundException(MedicalRecord.class.getName(),
                        medicalTestReq.getMedicalRecordId().toString()));
        var medicalTest = mappingHelper.map(medicalTestReq, MedicalTest.class);
        medicalTest.setMedicalRecord(medicalRecord);
        medicalTest.setTime(LocalDateTime.now());
        medicalTestRepository.save(medicalTest);

        List<ServicesOfMedicalTest> services = new ArrayList<>();
        float totalPrice = 0F;
        for (ServicesOfMedicalTestReq item : medicalTestReq.getServices()) {
            var serviceOfTest = mappingHelper.map(item, ServicesOfMedicalTest.class);
            var service = servicesRepository.findById(item.getServiceId())
                    .orElseThrow(() -> new EntityNotFoundException(Services.class.getName(), item.getServiceId().toString()));
            serviceOfTest.setMedicalTest(medicalTest);
            serviceOfTest.setServices(service);
            services.add(serviceOfTest);
            totalPrice += service.getPrice() * item.getQuantity();
        }
        servicesOfMedicalTestRepository.saveAll(services);

        medicalTest.setTotalPrice(totalPrice);
        medicalTestRepository.save(medicalTest);
    }

    @Override
    public MedicalTestDto getByMedicalRecord(Integer medicalRecordId) {
        var medicalTest = medicalTestRepository.findByMedicalRecord_Id(medicalRecordId)
                .orElseThrow(() -> new EntityNotFoundException(MedicalTest.class.getName()
                        , medicalRecordId.toString()));
        var res = mappingHelper.map(medicalTest, MedicalTestDto.class);
        res.setMedicalRecordId(medicalRecordId);

        List<ServicesOfMedicalTestDto> servicesRes = new ArrayList<>();
        servicesOfMedicalTestRepository.findByMedicalTest_Id(medicalTest.getId())
                .forEach(e -> {
                    var service = mappingHelper.map(e, ServicesOfMedicalTestDto.class);
                    service.setServiceDto(mappingHelper.map(e.getServices(), ServicesDto.class));
                    servicesRes.add(service);
                });
        res.setServices(servicesRes);
        return res;
    }

    private void deleteOldData(MedicalTestReq medicalTestReq) {
        var medicalTest = medicalTestRepository.findByMedicalRecord_Id(medicalTestReq.getMedicalRecordId())
                .orElseThrow(() -> new EntityNotFoundException(MedicalTest.class.getName()
                        , medicalTestReq.getMedicalRecordId().toString()));
        var services = servicesOfMedicalTestRepository.findByMedicalTest_Id(medicalTest.getId());
        servicesOfMedicalTestRepository.deleteAll(services);
        medicalTestRepository.delete(medicalTest);
    }
}
