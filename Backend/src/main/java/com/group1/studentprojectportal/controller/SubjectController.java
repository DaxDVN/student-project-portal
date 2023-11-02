package com.group1.studentprojectportal.controller;

import com.group1.studentprojectportal.constant.AppContants;
import com.group1.studentprojectportal.payload.ClassDto;
import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.SubjectDto;
import com.group1.studentprojectportal.service.impl.ClassService;
import com.group1.studentprojectportal.service.impl.SubjectService;
import com.group1.studentprojectportal.util.PaginationChecking;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@Slf4j
public class SubjectController {
    private final SubjectService subjectService;
    private final ClassService classService;

    public SubjectController(SubjectService subjectService, ClassService classService) {
        this.subjectService = subjectService;
        this.classService = classService;
    }

    @GetMapping
    public ResponseEntity<PagedResponse<SubjectDto>> getSubjects(
            @RequestParam(name = "page", required = false,
                    defaultValue = AppContants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false,
                    defaultValue = AppContants.DEFAULT_PAGE_SIZE) Integer size,
            @RequestParam(name = "name", required = false,
                    defaultValue = AppContants.DEFAULT_NAME) String name,
            @RequestParam(name = "manager", required = false,
                    defaultValue = AppContants.DEFAULT_MANAGER) String manager,
            @RequestParam(name = "status", required = false,
                    defaultValue = AppContants.DEFAULT_STATUS) String status,
            @RequestParam(name = "sortBy", required = false,
                    defaultValue = AppContants.DEFAULT_SORT_BY) String sortBy,
            @RequestParam(name = "order", required = false,
                    defaultValue = AppContants.DEFAULT_ORDER) String order
    ) {
        try {
            PaginationChecking.validatePageNumberAndSize(page, size);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("pagination subject");
        return subjectService.getAllSubjects(page, size, name, manager, status, sortBy, order);
    }
    @GetMapping("/all")
    public ResponseEntity<List<SubjectDto>> getSubjects() {
        log.info("all subject");
        return subjectService.getSubjects();
    }

    @PostMapping
    public ResponseEntity<SubjectDto> addSubject(
            @RequestBody @Valid SubjectDto request,
            Authentication authentication) {
        log.info("add subject");
        return subjectService.addSubject(request, authentication);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectDto> getSubjectById(@PathVariable Integer id) {
        log.info("id subject");
        return subjectService.getSubjectById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubjectDto> updateSubject(
            @PathVariable Integer id,
            @RequestBody SubjectDto request
    ) {
        log.info("update subject");
        return subjectService
                .updateSubject(id, request);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<SubjectDto> updateSubjectStatus(
            @PathVariable Integer id
    ) {
        log.info("update subject status");
        return subjectService.updateStatus(id);
    }

    @GetMapping("/{id}/classes")
    public ResponseEntity<PagedResponse<ClassDto>> getClassWithinSubject(
            @PathVariable Integer id,
            @RequestParam(name = "page", required = false, defaultValue = AppContants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppContants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        try {
            PaginationChecking.validatePageNumberAndSize(page, size);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        log.info("id subject class");
        return classService.getClassesBySubject(id, page, size);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SubjectDto> deleteSubject(
            @PathVariable Integer id
    ){
      return subjectService.deleteSubjectById(id);
    }
}