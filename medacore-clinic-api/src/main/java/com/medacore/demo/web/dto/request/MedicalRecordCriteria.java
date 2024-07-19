package com.medacore.demo.web.dto.request;

import com.medacore.demo.model.MedicalRecord;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
public class MedicalRecordCriteria {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String patientName;
    private String patientPhone;

    public Specification<MedicalRecord> toSpecification() {
        return ((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (Objects.nonNull(startDate)) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("time"), startDate));
            }
            if (Objects.nonNull(endDate)) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("time"), endDate.plusDays(1)));
            }
            if (StringUtils.isNotBlank(patientName)) {
                predicates.add(criteriaBuilder.like(root.get("patient").get("fullName"), StringUtils.wrap(patientName, "%")));
            }
            if (StringUtils.isNotBlank(patientPhone)) {
                predicates.add(criteriaBuilder.like(root.get("patient").get("phoneNumber"), StringUtils.wrap(patientPhone, "%")));
            }
            query.orderBy(criteriaBuilder.desc(root.get("time")));
            return criteriaBuilder.and(predicates.toArray(Predicate[]::new));
        });
    }
}
