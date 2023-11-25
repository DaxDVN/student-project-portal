package com.group1.studentprojectportal.repository;

import com.group1.studentprojectportal.constant.ClassStatuses;
import com.group1.studentprojectportal.constant.Roles;
import com.group1.studentprojectportal.entity.ClassEntity;
import com.group1.studentprojectportal.entity.Subject;
import com.group1.studentprojectportal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    @Query("SELECT c FROM ClassEntity c WHERE " +
            "(:code is null or c.code LIKE %:code%) " +
            "and (:semester is null or c.semester = :semester) " +
            "and (:manager is null or c.manager = :manager) " +
            "and (:status is null or c.status = :status)")
    Page<ClassEntity> findClassesWithFilters(@Param("code") String code,
                                             @Param("semester") String semester,
                                             @Param("manager") User manager,
                                             @Param("status") ClassStatuses status,
                                             Pageable pageable);
    @Query("SELECT COUNT(c) FROM ClassEntity c")
    long countClasses();

    @Query("SELECT u FROM User u " +
            "WHERE u.role = :role " +
            "AND NOT EXISTS (SELECT 1 FROM ClassEntity c " +
            "               JOIN c.students s " +
            "               WHERE s.id = u.id " +
            "               AND c.id = :classId)")
    Page<User> findStudentsNotInClass(@Param("role") Roles role,
                                      @Param("classId") Integer classId,
                                     Pageable pageable
    );

    @Query("SELECT c FROM ClassEntity c WHERE c.manager.id = :managerId")
    Page<ClassEntity> findClassesByManagerId(@Param("managerId") Integer managerId, Pageable pageable);

    @Query("SELECT c FROM ClassEntity c WHERE c.manager.id = :managerId")
    List<ClassEntity> findClassesByManagerId(@Param("managerId") Integer managerId);
}
