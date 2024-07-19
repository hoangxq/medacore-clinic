package com.medacore.demo.web.rest;

import com.medacore.demo.service.ServicesService;
import com.medacore.demo.web.dto.request.ServicesReq;
import com.medacore.demo.web.dto.response.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/services")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ServicesResource {

    private final ServicesService servicesService;

    @GetMapping
    public ResponseEntity<?> getAllServices() {
        return ResponseUtils.ok(servicesService.getAllServices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getServicesById(@PathVariable Integer id) {
        return ResponseUtils.ok(servicesService.getServicesById(id));
    }

    @GetMapping("/get-by-department/{departmentId}")
    public ResponseEntity<?> getServicesByDepartment(@PathVariable Integer departmentId) {
        return ResponseUtils.ok(servicesService.getServicesByDepartment(departmentId));
    }

    @PostMapping
    public ResponseEntity<?> createServices(@RequestBody ServicesReq servicesReq) {
        servicesService.createServices(servicesReq);
        return ResponseUtils.created();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateServices(@PathVariable Integer id, @RequestBody ServicesReq servicesReq) {
        servicesService.updateServices(id, servicesReq);
        return ResponseUtils.ok("Updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeServices(@PathVariable Integer id) {
        servicesService.removeServices(id);
        return ResponseUtils.ok("Removed");
    }
}
