package com.group1.studentprojectportal.service.impl;
import com.group1.studentprojectportal.constant.ClassStatuses;
import com.group1.studentprojectportal.entity.ClassEntity;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class ClassSpecifications {

    public static Specification<ClassEntity> filterClasses(Integer managerId, String name, String status) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (managerId != null) {
                predicates.add(criteriaBuilder.equal(root.get("manager").get("id"), managerId));
            }

            if (name != null && !name.isEmpty()) {
                predicates.add(criteriaBuilder.like(root.get("code"), "%" + name + "%"));
            }

            if (status != null && !status.equals("All Status")) {
                predicates.add(criteriaBuilder.equal(root.get("status"), ClassStatuses.valueOf(status)));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
