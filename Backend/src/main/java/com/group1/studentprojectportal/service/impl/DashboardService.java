package com.group1.studentprojectportal.service.impl;

import com.group1.studentprojectportal.constant.Roles;
import com.group1.studentprojectportal.repository.IClassRepository;
import com.group1.studentprojectportal.repository.IProjectRepository;
import com.group1.studentprojectportal.repository.ISubjectRepository;
import com.group1.studentprojectportal.repository.IUserRepository;
import com.group1.studentprojectportal.service.IDashboardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService implements IDashboardService {
    private final IUserRepository userRepository;
    private final ISubjectRepository subjectRepository;
    private final IClassRepository classRepository;
    private final IProjectRepository projectRepository;
    private final static Logger log = LoggerFactory.getLogger(SubjectService.class);

    public DashboardService(
            IUserRepository userRepository,
            ISubjectRepository subjectRepository,
            IClassRepository classRepository,
            IProjectRepository projectRepository
    ) {
        this.userRepository = userRepository;
        this.subjectRepository = subjectRepository;
        this.classRepository = classRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public ResponseEntity<List<Long>> viewDashboard(String role) {
//      user - subject - class - project
        List<Long> numberOfRecord = new ArrayList<>();
        switch (role){
            case "admin":
                numberOfRecord.add(userRepository.countAllUsers());
                numberOfRecord.add(subjectRepository.countSubjects());
                numberOfRecord.add(classRepository.countClasses());
                numberOfRecord.add(projectRepository.countProjects());
                break;
            case "subject_manager":
                System.out.println(1);
                break;
            default:
                break;
        }
        return new ResponseEntity<>(numberOfRecord, HttpStatus.OK);
    }
}
