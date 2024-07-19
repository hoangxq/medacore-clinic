package com.medacore.demo.repository;

import com.medacore.demo.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer>, JpaSpecificationExecutor<Account> {
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    Optional<Account> findOneByEmail(String email);

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    Optional<Account> findOneByUsername(String username);

    Boolean existsByUsernameOrEmail(String username, String email);
}
