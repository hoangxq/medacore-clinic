package com.medacore.demo.web.dto.request;

import lombok.Data;

@Data
public class RegisterStaffReq {
    private SignupRequest signupRequest;
    private StaffReq staffReq;
}
