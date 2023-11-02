package com.group1.studentprojectportal.service;

import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.SubjectDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ISubjectService {
    ResponseEntity<SubjectDto> addSubject(SubjectDto request, Authentication authentication);
    ResponseEntity<PagedResponse<SubjectDto>> getAllSubjects(Integer page, Integer size, String name, String managerId, String status, String sortBy, String order);

    ResponseEntity<List<SubjectDto>> getSubjects();

    ResponseEntity<SubjectDto> getSubjectById(Integer id);
    ResponseEntity<SubjectDto>  updateSubject(Integer id, SubjectDto request);
    ResponseEntity<SubjectDto> deleteSubjectById(Integer id);
    ResponseEntity<SubjectDto> updateStatus(Integer id);
}

