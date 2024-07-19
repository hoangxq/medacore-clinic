package com.medacore.demo.model;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Data;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import java.sql.Timestamp;

@Data
@MappedSuperclass
@TypeDefs({
        @TypeDef(name = "jsonType", typeClass = JsonType.class)
})
public abstract class BaseEntity {
    @ManyToOne
    @JoinColumn(name = "created_by")
    @CreatedBy
    private Account createdBy;

    @CreatedDate
    @Column(name = "created_at")
    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name = "updated_by")
    @LastModifiedBy
    private Account updatedBy;

    @Column(name = "updated_at")
    @LastModifiedDate
    private Timestamp updatedAt;
}
