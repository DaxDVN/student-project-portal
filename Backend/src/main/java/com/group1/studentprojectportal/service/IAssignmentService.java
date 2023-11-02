package com.group1.studentprojectportal.service;

import com.group1.studentprojectportal.payload.AssignmentDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface IAssignmentService {
    AssignmentDto createAssignment(AssignmentDto assignmentDto);
    //CRUD
    List<AssignmentDto> getAllAssignment();

    AssignmentDto getAssignmentById(Integer id);




    AssignmentDto updateAssignment(Integer id, AssignmentDto updateAssignmentInfo);

    AssignmentDto deleteAssignmentById(Integer id);

}
