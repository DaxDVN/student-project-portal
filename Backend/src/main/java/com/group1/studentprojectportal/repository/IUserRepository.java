package com.group1.studentprojectportal.repository;


import com.group1.studentprojectportal.constant.Roles;
import com.group1.studentprojectportal.entity.ClassEntity;
import com.group1.studentprojectportal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    User findUserById(Integer id);

    User findUserByEmail(String email);

    boolean existsByEmail(String email);

    Set<User> findByClasses(ClassEntity classEntity);

    Page<User> findUsersByClasses_Id(Integer classes_id, Pageable pageable);

    List<User> findUsersByRole(Roles role);

    Page<User> findUsersByRole(Roles role, Pageable pageable);

    Page<User> findUsersByFullNameContainingAndRole(String fullName, Roles roles, Pageable pageable);

    Page<User> findUsersByIsEnableAndIsVerifiedAndRoleAndFullNameContaining(
            boolean isEnabled, boolean isVerified,
            Roles roles, String fullName, Pageable pageable
    );
    Page<User> findUsersByIsEnableAndIsVerifiedAndFullNameContaining(
            boolean isEnabled, boolean isVerified,
             String fullName, Pageable pageable
    );
    Page<User> findByFullNameContaining(
             String fullName, Pageable pageable
    );

    Page<User> findUsersByIsEnableAndIsVerified(
            boolean isEnabled, boolean isVerified, Pageable pageable
    );
}
