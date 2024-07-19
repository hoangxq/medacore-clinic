package com.medacore.demo.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "medical_reports")
@Data
public class MedicalReport extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "time")
    private LocalDateTime time;
    @Column(name = "description")
    private String description;
    @Column(name = "unit_price")
    private Float unitPrice;
    @Column(name = "total_price")
    private Float totalPrice;
    @ManyToOne
    @JoinColumn(name = "medical_record_id")
    private MedicalRecord medicalRecord;
}
