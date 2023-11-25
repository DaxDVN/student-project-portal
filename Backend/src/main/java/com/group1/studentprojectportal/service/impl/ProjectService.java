package com.group1.studentprojectportal.service.impl;

import com.group1.studentprojectportal.entity.ClassEntity;
import com.group1.studentprojectportal.entity.Project;
import com.group1.studentprojectportal.entity.User;
import com.group1.studentprojectportal.exception.ResourceNotFoundException;
import com.group1.studentprojectportal.payload.ProjectDto;
import com.group1.studentprojectportal.payload.UserRequest;
import com.group1.studentprojectportal.repository.IProjectRepository;
import com.group1.studentprojectportal.repository.IUserRepository;
import com.group1.studentprojectportal.service.IProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProjectService implements IProjectService {

    private final static Logger log = LoggerFactory.getLogger(SubjectService.class);
    private IProjectRepository projectRepository;
    private IUserRepository userRepository;

    public ProjectService(
            IProjectRepository projectRepository, IUserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<ProjectDto> addProject(ProjectDto projectDto) {
        Project project = dtoToEntity(projectDto);
        project.setMentor(project.getCreator());
        project.setIsActive(false);
        Project newProject = projectRepository.save(project);
        return new ResponseEntity<>(entityToDTO(newProject), HttpStatus.OK);
    }

    @Override
    public List<ProjectDto> getProjectByClass(Integer id) {
        try {
            List<Project> projectList = projectRepository.findByProjectClass_Id(id);
            return projectList.stream().map(this::entityToDTO).toList();
        } catch (Exception e) {
            log.warn(e.getMessage());
            return null;
        }
    }

    @Override
    public List<ProjectDto> getProjectByManager(Integer id) {
        try {
            List<Project> projectList = projectRepository.findByCreatorId(id);
            return projectList.stream().map(this::entityToDTO).toList();
        } catch (Exception e) {
            log.warn(e.getMessage());
            return null;
        }
    }

    @Override
    public ResponseEntity<ProjectDto> getProjectById(Integer id) {
        try {
            Project project = projectRepository.findProjectById(id);
            return new ResponseEntity<>(entityToDTO(project), HttpStatus.OK);
        } catch (Exception e) {
            log.warn(e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<List<ProjectDto>> getProjectByUser(Integer id) {
        List<Project> list = projectRepository.findProjectsByUserId(id);
        List<ProjectDto> listResponse = list.stream().map(this::entityToDTO).toList();
        return new ResponseEntity<>(listResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ProjectDto> addStudentToProject(Integer projectId, List<UserRequest> studentList) {
        Project projectEntity = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        Set<User> members = projectEntity.getMembers();

        studentList.forEach(
                userRequest -> {
                    User user = userRepository.findUserById(userRequest.getId());
                    members.add(user);
                    user.getProjects().add(projectEntity);
                }
        );

        projectEntity.setMembers(members);

        try {
            Project updatedProject = projectRepository.save(projectEntity);
            return new ResponseEntity<>(entityToDTO(updatedProject), HttpStatus.OK);
        } catch (Exception e) {
            log.warn(e.getMessage());
            return null;
        }
    }

    @Override
    public ResponseEntity<ProjectDto> removeStudentFromProject(Integer projectId, Integer userId) {
        Project projectEntity = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));


        // Alternatively, if you want to update the project entity in the memory, you can do this:
        User userToRemove = userRepository.findUserById(userId);
        projectEntity.getMembers().remove(userToRemove);
        userToRemove.getProjects().remove(projectEntity);
        try {
            // Save the updated project entity
            Project updatedProject = projectRepository.save(projectEntity);
            return new ResponseEntity<>(entityToDTO(updatedProject), HttpStatus.OK);
        } catch (Exception e) {
            log.warn(e.getMessage());
            return null;
        }
    }


    @Override
    public ResponseEntity<ProjectDto> updateProject(Integer id, ProjectDto request) {
        Project projectEntity = dtoToEntity(request);

        if (!projectRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Project existingProject = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        existingProject.setProjectClass(projectEntity.getProjectClass());
        existingProject.setCreator(projectEntity.getCreator());
        existingProject.setMembers(projectEntity.getMembers());
        existingProject.setMentor(projectEntity.getMentor());
        existingProject.setLeader(projectEntity.getLeader());
        existingProject.setIsActive(projectEntity.getIsActive());
        existingProject.setProjectName(projectEntity.getProjectName());
        existingProject.setGroupName(projectEntity.getGroupName());
        existingProject.setTitle(projectEntity.getTitle());
        existingProject.setDescription(projectEntity.getDescription());
        existingProject.setUpdatedBy(projectEntity.getUpdatedBy());
        existingProject.setUpdated_at(new Timestamp(System.currentTimeMillis()));

        Project updatedProject = projectRepository.save(existingProject);
        return new ResponseEntity<>(entityToDTO(updatedProject), HttpStatus.OK);
    }

    //  =======-------=======-------sub-function-------=======-------=======
    public ProjectDto entityToDTO(Project source) {
        Set<Integer> memberIds = source.getMembers()
                .stream()
                .map(User::getId)
                .collect(Collectors.toSet());

        return ProjectDto.builder()
                .id(source.getId())
                .creatorId(source.getCreator().getId())
                .classId(source.getProjectClass().getId())
                .memberIds(memberIds)
                .mentorId(source.getMentor().getId())
                .leaderId(source.getLeader() != null ? source.getLeader().getId() : null)
                .isActive(source.getIsActive())
                .projectName(source.getProjectName())
                .groupName(source.getGroupName())
                .title(source.getTitle())
                .description(source.getDescription())
                .created_at(source.getCreated_at())
                .updatedBy(source.getUpdatedBy())
                .updated_at(source.getUpdated_at())
                .createdBy(source.getCreatedBy())
                .build();
    }

    public Project dtoToEntity(ProjectDto source) {
        User creator = new User();
        User mentor = new User();
        User leader = new User();
        ClassEntity classEntity = new ClassEntity();
        if (source.getCreatorId() != null) {
            creator.setId(source.getCreatorId());
        }
        if (source.getMentorId() != null) {
            mentor.setId(source.getMentorId());
        }
        if (source.getLeaderId() != null) {
            leader.setId(source.getLeaderId());
        }
        if (source.getClassId() != null) {
            classEntity.setId(source.getClassId());
        }
        Project project = Project.builder()
                .creator(creator)
                .projectClass(classEntity)
                .mentor(mentor)
                .leader(source.getLeaderId() != null ? leader : null)
                .isActive(source.getIsActive())
                .projectName(source.getProjectName())
                .groupName(source.getGroupName())
                .title(source.getTitle())
                .description(source.getDescription())
                .build();

        // Set members using the provided memberIds
        if (source.getMemberIds() != null && !source.getMemberIds().isEmpty()) {
            Set<User> members = source.getMemberIds()
                    .stream()
                    .map(id -> {
                        User member = new User();
                        member.setId(id);
                        return member;
                    })
                    .collect(Collectors.toSet());
            project.setMembers(members);
        } else {
            Set<User> members = new HashSet<>();
            project.setMembers(members);
        }

        return project;
    }
}
