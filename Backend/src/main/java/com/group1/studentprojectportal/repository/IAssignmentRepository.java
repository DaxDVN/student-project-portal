package com.group1.studentprojectportal.repository;

import com.group1.studentprojectportal.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface IAssignmentRepository extends JpaRepository<Assignment, Integer> {

    Assignment findAssignmentById(Integer id);

}
