package com.group1.studentprojectportal.repository;


import com.group1.studentprojectportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IIssueRepository extends JpaRepository<User, Integer> {
     User findUserByEmailAndPassword(String email, String password);
     User findUserById(Integer id);
     Optional<User> findUserByEmail(String email);

     boolean existsByEmail(String email);
}
