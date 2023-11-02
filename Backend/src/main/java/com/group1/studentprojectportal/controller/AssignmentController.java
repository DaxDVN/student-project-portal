package com.group1.studentprojectportal.controller;

import com.group1.studentprojectportal.entity.Assignment;
import com.group1.studentprojectportal.payload.AssignmentDto;
import com.group1.studentprojectportal.repository.IAssignmentRepository;
import com.group1.studentprojectportal.service.IAssignmentService;
import com.group1.studentprojectportal.service.impl.AssignmentService;
import com.group1.studentprojectportal.service.impl.SubjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final static Logger log = LoggerFactory.getLogger(SubjectService.class);

    private IAssignmentService assignmentService;

    @Autowired
    public AssignmentController(IAssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping
    public ResponseEntity<AssignmentDto> createAssigment(@RequestBody AssignmentDto assignmentDto) {
        log.info("Input " + assignmentDto);
        AssignmentDto saveAssignment = assignmentService.createAssignment((assignmentDto));
        return new ResponseEntity<>(saveAssignment, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AssignmentDto>> getAllAssignment() {
        log.info("1");

        List<AssignmentDto> assignment = assignmentService.getAllAssignment();
        return ResponseEntity.ok(assignment);
    }

    @GetMapping("{id}")
    public ResponseEntity<AssignmentDto> getAssignmentById(@PathVariable Integer id) {
        AssignmentDto assignmentDto = assignmentService.getAssignmentById(id);
        return ResponseEntity.ok(assignmentDto);
    }

    @PutMapping("{id}")
    public  ResponseEntity<AssignmentDto> updateAssignment(@PathVariable Integer id,
                                                           @RequestBody AssignmentDto updateAssignmentInfo){
        AssignmentDto assignmentDto = assignmentService.updateAssignment(id, updateAssignmentInfo );
        return ResponseEntity.ok(assignmentDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAssignment(@PathVariable Integer id) {
        assignmentService.deleteAssignmentById(id);
        return ResponseEntity.ok("Deleted Succesfully");
    }


}
