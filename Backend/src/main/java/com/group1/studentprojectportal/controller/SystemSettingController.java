package com.group1.studentprojectportal.controller;

import com.group1.studentprojectportal.constant.AppContants;
import com.group1.studentprojectportal.constant.SystemSettings;
import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.SystemSettingDto;
import com.group1.studentprojectportal.service.ISystemSettingService;
import com.group1.studentprojectportal.service.impl.SystemSettingService;
import com.group1.studentprojectportal.util.PaginationChecking;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/system-setting")
@Slf4j
public class SystemSettingController {
    private final ISystemSettingService systemSettingService;


    public SystemSettingController(ISystemSettingService systemSettingService) {
        this.systemSettingService = systemSettingService;
    }

    @GetMapping
    public ResponseEntity<PagedResponse<SystemSettingDto>> getSystemSettings(
            @RequestParam(name = "page", required = false, defaultValue = AppContants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppContants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        try {
            PaginationChecking.validatePageNumberAndSize(page, size);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return systemSettingService.getAllSystemSettings(page, size);
    }

    @GetMapping("/group")
    public ResponseEntity<PagedResponse<SystemSettingDto>> getSystemSettingsByGroup(
            @RequestParam(name = "page", required = false,
                    defaultValue = AppContants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false,
                    defaultValue = AppContants.DEFAULT_PAGE_SIZE) Integer size,
            @RequestParam(name = "group", required = false,
                    defaultValue = "") SystemSettings settingGroup

            ) {
        try {
            PaginationChecking.validatePageNumberAndSize(page, size);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return systemSettingService.getAllSystemSettingsByGroup(page, size, settingGroup);
    }

    @GetMapping("/group/all")
    public List<SystemSettingDto> getSystemSettingsByGroup(
            @RequestParam(name = "group", required = false,
                    defaultValue = "") SystemSettings settingGroup
    ){
        return  systemSettingService.getAllSystemSettingsByGroup(settingGroup);
    }

    @GetMapping("/all")
    public ResponseEntity<List<SystemSettingDto>> getSystemSettings() {
        log.info("all subject");
        return systemSettingService.getAllSystemSettings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SystemSettingDto> getSystemSettingById(@PathVariable Integer id) {
        return systemSettingService.getSystemSettingById(id);
    }

    @PostMapping
    public ResponseEntity<SystemSettingDto> addSystemSetting(
            @RequestBody @Valid SystemSettingDto request) {
        return systemSettingService.addSystemSetting(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SystemSettingDto> updateSystemSetting(@PathVariable Integer id, @RequestBody SystemSettingDto request) {
        return systemSettingService.updateSystemSetting(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SystemSettingDto> deleteSystemSetting(@PathVariable Integer id) {
        return systemSettingService.deleteSystemSettingById(id);
    }

}
