package com.medacore.demo.service.utils;

import com.medacore.demo.model.Account;
import com.medacore.demo.repository.AccountRepository;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<Account> {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Optional<Account> getCurrentAuditor() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (new EmailValidator().isValid(username, null))
            return accountRepository.findOneByEmail(username);
        return accountRepository.findOneByUsername(username);
    }
}
