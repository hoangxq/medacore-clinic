package com.medacore.demo.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "medicine_of_prescription")
@Data
public class MedicineOfPrescription extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "medicine")
    private Medicine medicine;
    @ManyToOne
    @JoinColumn(name = "prescription")
    private Prescription prescription;
    @Column(name = "quantity")
    private Integer quantity;
}
