package com.group1.studentprojectportal.repository;

import com.group1.studentprojectportal.entity.Subject;
import com.group1.studentprojectportal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISubjectRepository extends JpaRepository<Subject, Integer> {
    Subject findSubjectById(Integer id);

    boolean existsByIdOrCode(Integer id, String code);

    Page<Subject> findSubjectByNameContaining(String name, Pageable pageable);
    Page<Subject> findSubjectByManagerAndNameContaining(User manager,String name, Pageable pageable);

    Page<Subject> findSubjectByIsEnableAndManagerAndNameContaining(
            boolean isEnable, User manager, String name, Pageable pageable
    );
    Page<Subject> findSubjectByIsEnableAndNameContaining(
            boolean isEnable, String name, Pageable pageable
    );
}
