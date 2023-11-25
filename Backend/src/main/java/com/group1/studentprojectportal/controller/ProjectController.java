package com.group1.studentprojectportal.controller;

import com.group1.studentprojectportal.payload.ProjectDto;
import com.group1.studentprojectportal.payload.UserRequest;
import com.group1.studentprojectportal.service.IProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@Slf4j
public class ProjectController {

    @Autowired
    private IProjectService projectService;


    @PostMapping()
    public ResponseEntity<ProjectDto> addProject(
            @RequestBody ProjectDto request) {
        log.info("{}", request);
        return projectService.addProject(request);
    }
    @GetMapping("class/{id}")
    public List<ProjectDto> getProjectsByClass(
            @PathVariable Integer id
    ){
        return projectService.getProjectByClass(id);
    }
    @GetMapping("manager/{id}")
    public List<ProjectDto> getProjectsByManager(
            @PathVariable Integer id
    ){
        return projectService.getProjectByManager(id);
    }

    @PostMapping("{id}/users")
    public ResponseEntity<ProjectDto> updateStudentToProject(
            @RequestParam(name = "action", required = false) String action,
            @PathVariable Integer id,
            @RequestBody List<UserRequest> studentList
    ) {
        if (action.equalsIgnoreCase("add")) {
            return projectService.addStudentToProject(id, studentList);
        } else {
            return projectService.removeStudentFromProject(id, studentList.get(0).getId());
        }
    }

    @GetMapping("/{id}/student/join")
    public ResponseEntity<List<ProjectDto>> getClassByUser(
            @PathVariable Integer id) {
        return projectService.getProjectByUser(id);
    }
}
