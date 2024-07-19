package com.medacore.demo.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "services_of_medical_test")
@Data
public class ServicesOfMedicalTest extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "medical_test_id")
    private MedicalTest medicalTest;
    @ManyToOne
    @JoinColumn(name = "services_id")
    private Services services;
    @Column(name = "quantity")
    private Integer quantity;
}
