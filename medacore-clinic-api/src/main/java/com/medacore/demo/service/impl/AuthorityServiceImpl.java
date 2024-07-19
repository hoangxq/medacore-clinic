package com.medacore.demo.service.impl;

import com.medacore.demo.model.Authority;
import com.medacore.demo.repository.AuthorityRepository;
import com.medacore.demo.service.AuthorityService;
import com.medacore.demo.service.utils.MappingHelper;
import com.medacore.demo.web.dto.request.AuthorityReq;
import com.medacore.demo.web.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthorityServiceImpl implements AuthorityService {
    private final AuthorityRepository authorityRepository;
    private final MappingHelper mappingHelper;

    @Override
    public void createAuthority(AuthorityReq authorityReq) {
        authorityRepository.save(mappingHelper.map(authorityReq, Authority.class));
    }

    @Override
    public List<Authority> getAuthorities() {
        return authorityRepository.findAll();
    }

    @Override
    public void updateAuthority(Integer authorityId, AuthorityReq authorityReq) {
        var authority = authorityRepository.findById(authorityId)
                .orElseThrow(() -> new EntityNotFoundException(Authority.class.getName(), authorityId.toString()));
        mappingHelper.copyProperties(authorityReq, authority);
        authorityRepository.save(authority);
    }

    @Override
    public void deleteAuthority(Integer authorityId) {
        authorityRepository.deleteById(authorityId);
    }
}
