package com.medacore.demo.web.dto.request;

import com.medacore.demo.model.AppointmentSchedule;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
public class AppointmentScheduleCriteria {
    private Date startDate;
    private Date endDate;
    private String patientUsername;

    public Specification<AppointmentSchedule> toSpecification() {
        return ((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (Objects.nonNull(startDate)) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("time"), startDate));
            }
            if (Objects.nonNull(endDate)) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("time"), endDate));
            }
            if (StringUtils.isNotBlank(patientUsername)) {
                predicates.add(criteriaBuilder.equal(root.get("patient").get("account").get("username"), patientUsername));
            }
            query.orderBy(criteriaBuilder.desc(root.get("time")));
            return criteriaBuilder.and(predicates.toArray(Predicate[]::new));
        });
    }
}
