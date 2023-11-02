package com.group1.studentprojectportal.repository;

import com.group1.studentprojectportal.entity.ClassEntity;
import com.group1.studentprojectportal.entity.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IClassRepository extends JpaRepository<ClassEntity, Integer> {
    boolean existsByIdOrCode(Integer id, String code);

    Optional<ClassEntity> findClassEntityById(Integer id);

    Page<ClassEntity> findClassEntitiesBySubject_Id(Integer subject_id, Pageable pageable);

    @Query("SELECT DISTINCT c.manager.id FROM ClassEntity c")
    List<Integer> findAllManagerIds();

    Page<ClassEntity> findClassEntitiesByCodeContaining(String name, Pageable pageable);
    Page<ClassEntity> findAll(Specification<ClassEntity> specification, Pageable pageable);
}
