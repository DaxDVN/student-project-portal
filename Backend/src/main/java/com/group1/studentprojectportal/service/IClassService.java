package com.group1.studentprojectportal.service;

import com.group1.studentprojectportal.payload.ClassDto;
import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.UserRequest;
import com.group1.studentprojectportal.payload.UserResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IClassService {
    ResponseEntity<ClassDto> addClass(ClassDto request);

    ResponseEntity<PagedResponse<ClassDto>> getAllClasses(Integer page, Integer size);

    ResponseEntity<PagedResponse<ClassDto>> getAllClasses(
            Integer page, Integer size, String name,
            Integer managerId, String status, String sortBy, String order
    );

    List<UserResponse> getAllManagers();

    ResponseEntity<ClassDto> getClassById(Integer id);

    ResponseEntity<PagedResponse<ClassDto>> getClassesBySubject(Integer id, Integer page, Integer size);

    ResponseEntity<ClassDto> updateClass(Integer id, ClassDto request);

    ResponseEntity<PagedResponse<ClassDto>>  deleteClassById(Integer id);

    ResponseEntity<ClassDto> updateStatus(Integer id);

    ResponseEntity<ClassDto> addStudentToClass(Integer id, List<UserRequest> studentList);

    ResponseEntity<ClassDto> removeStudentFromClass(Integer id, List<UserRequest> studentList);
}
