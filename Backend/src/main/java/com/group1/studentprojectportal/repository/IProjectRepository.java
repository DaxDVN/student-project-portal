package com.group1.studentprojectportal.repository;

import com.group1.studentprojectportal.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProjectRepository extends JpaRepository<Project, Integer> {


}