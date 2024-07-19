package com.medacore.demo.service;

import com.medacore.demo.web.dto.ServicesDto;
import com.medacore.demo.web.dto.request.ServicesReq;

import java.util.List;

public interface ServicesService {
    List<ServicesDto> getAllServices();

    ServicesDto getServicesById(Integer id);

    void createServices(ServicesReq servicesReq);

    void updateServices(Integer id, ServicesReq servicesReq);

    void removeServices(Integer id);

    List<ServicesDto> getServicesByDepartment(Integer departmentId);
}
