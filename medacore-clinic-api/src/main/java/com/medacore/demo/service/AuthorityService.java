package com.medacore.demo.service;

import com.medacore.demo.model.Authority;
import com.medacore.demo.web.dto.request.AuthorityReq;

import java.util.List;

public interface AuthorityService {
    void createAuthority(AuthorityReq authorityReq);

    List<Authority> getAuthorities();

    void updateAuthority(Integer authorityId, AuthorityReq authorityReq);

    void deleteAuthority(Integer authorityId);
}
