package com.group1.studentprojectportal.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.studentprojectportal.entity.Assignment;
import com.group1.studentprojectportal.entity.Subject;
import com.group1.studentprojectportal.entity.User;
import com.group1.studentprojectportal.payload.AssignmentDto;
import com.group1.studentprojectportal.payload.SubjectDto;

import com.group1.studentprojectportal.repository.IAssignmentRepository;
import com.group1.studentprojectportal.service.IAssignmentService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.group1.studentprojectportal.exception.ResourceNotFoundException;
@Service
public class AssignmentService implements IAssignmentService {
    private final static Logger log = LoggerFactory.getLogger(SubjectService.class);
    final ModelMapper modelMapper = new ModelMapper();

    IAssignmentRepository iAssignmentRepository;

    @Autowired
    public AssignmentService(IAssignmentRepository iAssignmentRepository) {
        this.iAssignmentRepository = iAssignmentRepository;
    }

    @Override
    public AssignmentDto createAssignment(AssignmentDto assignmentDto) {
        Assignment assignment = mapDtoToEntity(assignmentDto);
        log.info("assignment" + assignment);

        Assignment savedAssignment = iAssignmentRepository.save(assignment);

        return mapEntityToDto(savedAssignment);
    }

    @Override
    public List<AssignmentDto> getAllAssignment() {

        List<Assignment> assignmentList = iAssignmentRepository.findAll();
        List<AssignmentDto> assignmentDtoList = new ArrayList<>();
        for (Assignment assignment : assignmentList) {
            AssignmentDto assignmentDto = mapEntityToDto(assignment);
            assignmentDtoList.add(assignmentDto);
        }
        return assignmentDtoList;
    }

    @Override
    public AssignmentDto getAssignmentById(Integer id) {
        Assignment assignmentById = iAssignmentRepository.findAssignmentById(id);

        return mapEntityToDto(assignmentById);
    }

    @Override
    public AssignmentDto updateAssignment(Integer id, AssignmentDto updateAssignmentInfo) {
//        @Valid Assignment assignmentNew;
//        try {
//            assignmentNew = (new ObjectMapper()).convertValue(updateAssignmentInfo, Assignment.class);
//            Assignment assignmentObj = iAssignmentRepository.findAssignmentById(assignmentNew.getId());
////            update subject info
//           assignmentObj.setSubject(assignmentNew.getSubject());
//
//            if (!assignmentNew.getTitle().isEmpty()) {
//                assignmentObj.setTitle(assignmentNew.getTitle());
//            }
//            assignmentNew = iAssignmentRepository.save(assignmentObj);
//            return mapEntityToDto(assignmentNew);
//        } catch (Exception e) {
//            log.warn(e.getMessage());
//        }
//        return null;
//    }


        Assignment assignment = iAssignmentRepository.findById(id).orElseThrow(() ->  new ResourceNotFoundException(" Assignment is not exist: " + id));
        assignment.setTitle(updateAssignmentInfo.getTitle());
        assignment.setDescription(updateAssignmentInfo.getDescription());
        assignment.setAdminId(updateAssignmentInfo.getUserId());
        Assignment updateAssignmentObj = iAssignmentRepository.save(assignment);
        return mapEntityToDto(assignment);
    }


    @Override
    public AssignmentDto deleteAssignmentById(Integer id) {
        try {
            Assignment assignment = iAssignmentRepository.findAssignmentById(id);
            iAssignmentRepository.deleteById(id);
            return  mapEntityToDto(assignment);
        } catch (Exception e) {
            log.warn(e.getMessage());
        }
        return null;
    }



    private AssignmentDto mapEntityToDto(Assignment assignment) {

        return AssignmentDto.builder()
                .id(assignment.getId())
                .title(assignment.getTitle())
                .description(assignment.getDescription())
                .date(assignment.getCreated_at())
                .subjectName(assignment.getSubject().getName())
                .creatorName(assignment.getCreator().getFullName())
                .build();
    }

    private Assignment mapDtoToEntity(AssignmentDto assignmentDto){

        return Assignment.builder()
                .title(assignmentDto.getTitle())
                .description(assignmentDto.getDescription())
                .creator(User.builder()
                        .id(assignmentDto.getCreatorId())
                        .build())
                .subject(Subject.builder()
                        .id(assignmentDto.getSubjectId())
                        .build())
                .build();
    }
}
