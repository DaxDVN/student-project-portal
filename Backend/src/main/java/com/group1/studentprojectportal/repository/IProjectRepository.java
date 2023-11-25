package com.group1.studentprojectportal.repository;

import com.group1.studentprojectportal.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface IProjectRepository extends JpaRepository<Project, Integer> {
    @Query("SELECT COUNT(p) FROM Project p")
    long countProjects();
    List<Project> findByProjectClass_Id(Integer classId);
    Project findProjectById(Integer id);
    boolean existsById(Integer id);
    @Query("SELECT p FROM Project p WHERE p.creator.id = :creatorId")
    List<Project> findByCreatorId(@Param("creatorId") Integer creatorId);
    @Query("SELECT p FROM Project p WHERE p.id = :projectId")
    Optional<Project> findById(@Param("projectId") Integer projectId);

    @Query("SELECT p FROM Project p JOIN p.members m WHERE m.id = :userId")
    List<Project> findProjectsByUserId(@Param("userId") Integer userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Project p WHERE p.id = :projectId AND :userId MEMBER OF p.members")
    void deleteMemberFromProject(@Param("projectId") Integer projectId, @Param("userId") Integer userId);

}