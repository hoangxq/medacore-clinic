package com.medacore.demo.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "medical_record_informations")
@Data
public class MedicalRecordInformation extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "weight")
    private Float weight;
    @Column(name = "height")
    private Float height;
    @Column(name = "body_temperature")
    private Float bodyTemperature;
    @Column(name = "heartbeat")
    private Float heartbeat;
    @Column(name = "blood_pressure")
    private Float bloodPressure;
    @Column(name = "detail_medical", columnDefinition = "TEXT")
    private String detailMedical;
    @Column(name = "diagnose")
    private String diagnose;
    @Column(name = "solution")
    private String solution;
    @OneToOne
    @JoinColumn(name = "medical_record_id")
    private MedicalRecord medicalRecord;
}
