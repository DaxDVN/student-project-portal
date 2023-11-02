package com.group1.studentprojectportal.service.impl;

import com.group1.studentprojectportal.entity.ClassEntity;
import com.group1.studentprojectportal.entity.Project;
import com.group1.studentprojectportal.entity.User;
import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.dto.ClassDto;
import com.group1.studentprojectportal.payload.ProjectDto;
import com.group1.studentprojectportal.payload.UserDto;
import com.group1.studentprojectportal.repository.IProjectRepository;
import com.group1.studentprojectportal.repository.IUserRepository;
import com.group1.studentprojectportal.service.IProjectService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService implements IProjectService {

    private final static Logger log = LoggerFactory.getLogger(SubjectService.class);
    private final ModelMapper modelMapper = new ModelMapper();
    @Autowired
    private  IProjectRepository iProjectRepository;

    @Autowired
    private IUserRepository userRepository;



    @Override
    public ResponseEntity<ProjectDto> addProject(ProjectDto projectDto) {

        Project project = mapDtoToEntity(projectDto);
//        User creator = userRepository.findUserById(projectDto.getId());
        System.out.println(project);
//        System.out.println(creator);
        System.out.println("ok");

        Project saved = iProjectRepository.save(project);
        ProjectDto resPayload = mapEntityToDto(saved);

        return new ResponseEntity<>(resPayload, HttpStatus.CREATED);
    }


    @Override
    public ResponseEntity<ProjectDto> addSystemSetting(ProjectDto request) {
        return null;
    }

    @Override
    public ResponseEntity<ProjectDto> updateSystemSetting(Integer id, ProjectDto request) {
        return null;
    }

    @Override
    public ResponseEntity<ProjectDto> deleteSystemSettingById(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<PagedResponse<ProjectDto>> getAllSystemSettings(Integer page, Integer size) {
        return null;
    }

    @Override
    public ResponseEntity<List<ProjectDto>> getAllSystemSettingsByGroup(Integer page, Integer size, ProjectDto settingGroup) {
        return null;
    }

    @Override
    public ResponseEntity<List<ProjectDto>> getAllSystemSettings() {
        return null;
    }

    @Override
    public ResponseEntity<ProjectDto> getSystemSettingById(Integer id) {
        return null;
    }


    //  =======-------=======-------sub-function-------=======-------=======

    private ProjectDto mapEntityToDto(Project project) {
        UserDto creatorDto = modelMapper.map(project.getCreator(), UserDto.class);
        UserDto mentorDto = modelMapper.map(project.getMentor(), UserDto.class);
        ClassDto classDto = modelMapper.map(project.getProjectClass(), ClassDto.class);
        ProjectDto projectDto = modelMapper.map(project, ProjectDto.class);

        projectDto.setCreator(creatorDto);
        projectDto.setMentor(mentorDto);
        projectDto.setClassDto(classDto);

        return projectDto;

    }

    private Project mapDtoToEntity(ProjectDto projectDto) {
//        User creator = modelMapper.map(projectDto.getCreator(), User.class);
        User creator = userRepository.findUserById(projectDto.getCreator().getId());
        User mentor = modelMapper.map(projectDto.getMentor(), User.class);
        ClassEntity classEntity = modelMapper.map(projectDto.getClassDto(), ClassEntity.class);
        Project project = modelMapper.map(projectDto, Project.class);
        System.out.println(creator);
        project.setCreatedBy(creator.getFullName());
        project.setUpdatedBy(creator.getFullName());
        project.setCreator(creator);
        project.setMentor(mentor);
        project.setProjectClass(classEntity);

        return project;

    }
}
