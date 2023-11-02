package com.group1.studentprojectportal.service;

import com.group1.studentprojectportal.constant.SystemSettings;
import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.SubjectDto;
import com.group1.studentprojectportal.payload.SystemSettingDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ISystemSettingService {
    ResponseEntity<SystemSettingDto> addSystemSetting(SystemSettingDto request);
    ResponseEntity<SystemSettingDto>  updateSystemSetting(Integer id, SystemSettingDto request);
    ResponseEntity<SystemSettingDto> deleteSystemSettingById(Integer id);
    ResponseEntity<PagedResponse<SystemSettingDto>> getAllSystemSettings(Integer page, Integer size);

    ResponseEntity<PagedResponse<SystemSettingDto>> getAllSystemSettingsByGroup(Integer page, Integer size, SystemSettings settingGroup);

    List<SystemSettingDto> getAllSystemSettingsByGroup(SystemSettings settingGroup);

    ResponseEntity<List<SystemSettingDto>> getAllSystemSettings();

    ResponseEntity<SystemSettingDto> getSystemSettingById(Integer id);

}
