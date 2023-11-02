package com.group1.studentprojectportal.service;

import com.group1.studentprojectportal.constant.SystemSettings;
import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.SystemSettingDto;
import com.group1.studentprojectportal.payload.ProjectDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IProjectService {

    ResponseEntity<ProjectDto> addProject(ProjectDto projectDto);
    ResponseEntity<ProjectDto> addSystemSetting(ProjectDto request);
    ResponseEntity<ProjectDto>  updateSystemSetting(Integer id, ProjectDto request);
    ResponseEntity<ProjectDto> deleteSystemSettingById(Integer id);
    ResponseEntity<PagedResponse<ProjectDto>> getAllSystemSettings(Integer page, Integer size);

    ResponseEntity<List<ProjectDto>> getAllSystemSettingsByGroup(Integer page, Integer size, ProjectDto settingGroup);

    ResponseEntity<List<ProjectDto>> getAllSystemSettings();

    ResponseEntity<ProjectDto> getSystemSettingById(Integer id);
}
