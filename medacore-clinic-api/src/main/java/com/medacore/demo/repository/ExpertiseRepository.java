package com.medacore.demo.repository;

import com.medacore.demo.model.Expertise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpertiseRepository extends JpaRepository<Expertise, Integer> {
}
