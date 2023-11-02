package com.group1.studentprojectportal.controller;

import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.ProjectDto;
import com.group1.studentprojectportal.service.IProjectService;
import jakarta.validation.Valid;
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


    @GetMapping()
    public  ResponseEntity<PagedResponse<ProjectDto>> getProjects(){
        return null;
    }

    @PostMapping()
    public ResponseEntity<ProjectDto> addProject(
            @RequestBody @Valid ProjectDto request) {
        return projectService.addProject(request);
    }



}
