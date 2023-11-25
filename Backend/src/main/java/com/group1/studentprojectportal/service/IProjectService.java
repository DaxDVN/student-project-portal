package com.group1.studentprojectportal.service;

import com.group1.studentprojectportal.payload.ProjectDto;
import com.group1.studentprojectportal.payload.UserRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IProjectService {

    ResponseEntity<ProjectDto> addProject(ProjectDto projectDto);

    List<ProjectDto> getProjectByClass(Integer id);

    List<ProjectDto> getProjectByManager(Integer id);

    ResponseEntity<ProjectDto> getProjectById(Integer id);

    ResponseEntity<List<ProjectDto>> getProjectByUser(Integer id);

    ResponseEntity<ProjectDto> addStudentToProject(Integer projectId, List<UserRequest> studentList);

    ResponseEntity<ProjectDto> removeStudentFromProject(Integer projectId, Integer userId);

    ResponseEntity<ProjectDto> updateProject(Integer id, ProjectDto request);
}
