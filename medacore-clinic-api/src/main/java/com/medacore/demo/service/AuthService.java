package com.medacore.demo.service;

import com.medacore.demo.model.Account;
import com.medacore.demo.web.dto.AccountDto;
import com.medacore.demo.web.dto.request.*;
import com.medacore.demo.web.dto.response.JwtResponse;

public interface AuthService {
    JwtResponse authenticateAccount(LoginRequest loginRequest);

    Account createAccount(SignupRequest signupRequest);

    void registerPatient(RegisterPatientReq registerPatientReq);

    void registerStaff(RegisterStaffReq registerStaffReq);

    void updateAccount(Integer accountId, AccountReq accountReq);

    AccountDto getAccount(Integer accountId);
}
