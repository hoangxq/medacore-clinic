package com.medacore.demo.config;

import com.medacore.demo.model.Account;
import com.medacore.demo.service.utils.AuditorAwareImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class PersistentConfig {
    @Bean
    public AuditorAware<Account> auditorProvider() {
        return new AuditorAwareImpl();
    }
}
