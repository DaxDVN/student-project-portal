package com.group1.studentprojectportal.service.impl;

import com.group1.studentprojectportal.constant.SystemSettings;
import com.group1.studentprojectportal.entity.SystemSetting;
import com.group1.studentprojectportal.entity.User;
import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.SystemSettingDto;
import com.group1.studentprojectportal.payload.dto.UserDto;
import com.group1.studentprojectportal.repository.ISystemSettingRepository;
import com.group1.studentprojectportal.service.ISystemSettingService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class SystemSettingService implements ISystemSettingService {

    private final static Logger log = LoggerFactory.getLogger(SubjectService.class);
    final ModelMapper modelMapper = new ModelMapper();
    private final ISystemSettingRepository systemSettingRepository;

    public SystemSettingService(ISystemSettingRepository systemSettingRepository) {
        this.systemSettingRepository = systemSettingRepository;
    }

    @Override
    public ResponseEntity<SystemSettingDto> addSystemSetting(SystemSettingDto request) {
        SystemSetting setting = dtoToEntity(request);
        System.out.println("ok");
        if (systemSettingRepository.existsByName(
                setting.getName())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        SystemSetting newSetting = systemSettingRepository.save(setting);
        return new ResponseEntity<>(entityToDTO(newSetting), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<SystemSettingDto> updateSystemSetting(Integer id, SystemSettingDto request) {
        SystemSetting setting;
        Optional<SystemSetting> optSettingOld = systemSettingRepository.findById(id);
        if (!optSettingOld.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
//      update subject info
        setting = dtoToEntity(request, optSettingOld.get());
        System.out.println(setting);
        System.out.println(request);
        systemSettingRepository.save(setting);
        return new ResponseEntity<>(
                entityToDTO(setting), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SystemSettingDto> deleteSystemSettingById(Integer id) {
        Optional<SystemSetting> optSystemSetting = systemSettingRepository.findById(id);
        systemSettingRepository.deleteById(id);
        if (!systemSettingRepository.existsById(id)) {
            return new ResponseEntity<>(
                    entityToDTO(optSystemSetting.get()), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<PagedResponse<SystemSettingDto>> getAllSystemSettings(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");

        Page<SystemSetting> settingPage = systemSettingRepository.findAll(pageable);
        if (settingPage.getNumberOfElements() == 0) {
            PagedResponse<SystemSettingDto> test =
                    new PagedResponse<>(Collections.emptyList(), settingPage.getNumber(),
                            settingPage.getSize(), settingPage.getTotalElements(),
                            settingPage.getTotalPages(), settingPage.isLast());
            return new ResponseEntity<>(test, HttpStatus.NOT_FOUND);
        }
        List<SystemSettingDto> systemSettingDTOS = settingPage.getContent().stream().map(this::entityToDTO).toList();
        PagedResponse<SystemSettingDto> test = new PagedResponse<>(systemSettingDTOS, settingPage.getNumber(), settingPage.getSize(), settingPage.getTotalElements(), settingPage.getTotalPages(),
                settingPage.isLast());
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PagedResponse<SystemSettingDto>> getAllSystemSettingsByGroup(Integer page, Integer size, SystemSettings settingGroup) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");

        Page<SystemSetting> settingByGroupPage = systemSettingRepository.findAllBySettingGroup(settingGroup, pageable);
        if (settingByGroupPage.getNumberOfElements() == 0) {
            PagedResponse<SystemSettingDto> test =
                    new PagedResponse<>(Collections.emptyList(), settingByGroupPage.getNumber(),
                            settingByGroupPage.getSize(), settingByGroupPage.getTotalElements(),
                            settingByGroupPage.getTotalPages(), settingByGroupPage.isLast());
            return new ResponseEntity<>(test, HttpStatus.NOT_FOUND);
        }
        List<SystemSettingDto> systemSettingDTOS = settingByGroupPage.stream().map(this::entityToDTO).toList();
        PagedResponse<SystemSettingDto> test = new PagedResponse<>(systemSettingDTOS, settingByGroupPage.getNumber(), settingByGroupPage.getSize(), settingByGroupPage.getTotalElements(), settingByGroupPage.getTotalPages(),
                settingByGroupPage.isLast());
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    @Override
    public List<SystemSettingDto> getAllSystemSettingsByGroup(SystemSettings settingGroup){
        System.out.println(settingGroup);
        List<SystemSetting> systemSettings = systemSettingRepository.findAllBySettingGroup(settingGroup);
        return systemSettings.stream().map(this::entityToDTO).toList();
    }

    public ResponseEntity<List<SystemSettingDto>> getAllSystemSettings() {

        List<SystemSetting> systemSettings = systemSettingRepository.findAll();
        List<SystemSettingDto> systemSettingDTOS = systemSettings.stream().map(this::entityToDTO).toList();
        return new ResponseEntity<>(systemSettingDTOS, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SystemSettingDto> getSystemSettingById(Integer id) {
        Optional<SystemSetting> optionalSystemSetting = systemSettingRepository.findById(id);
        if (optionalSystemSetting.isPresent()) {
            return new ResponseEntity<>(
                    entityToDTO(optionalSystemSetting.get()), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    //  =======-------=======-------sub-function-------=======-------=======

    public SystemSetting dtoToEntity(SystemSettingDto dto){
        SystemSetting entity = new SystemSetting();
        entity.setCreator(dtoToEntity(dto.getCreator()));
        entity.setSettingGroup(dto.getSettingGroup());
        entity.setName(dto.getName());
        entity.setDisplayOrder(dto.getDisplayOrder());
        entity.setIsEnable(dto.getIsEnable());
        entity.setDescription(dto.getDescription());
        entity.setAdminId(dto.getAdminId());
        return entity;
    }
    public SystemSettingDto entityToDTO(SystemSetting entity){
        SystemSettingDto dto = new SystemSettingDto();
        dto.setId(entity.getId());
        dto.setCreator(entityToDTO(entity.getCreator()));
        dto.setSettingGroup(entity.getSettingGroup());
        dto.setName(entity.getName());
        dto.setDisplayOrder(entity.getDisplayOrder());
        dto.setIsEnable(entity.getIsEnable());
        dto.setDescription(entity.getDescription());
        dto.setAdminId(entity.getAdminId());
        return  dto;
    }

    public SystemSetting dtoToEntity(SystemSettingDto dto, SystemSetting entity){
        entity.setCreator(dtoToEntity(dto.getCreator()));
        entity.setSettingGroup(dto.getSettingGroup());
        entity.setName(dto.getName());
        entity.setDisplayOrder(dto.getDisplayOrder());
        entity.setIsEnable(dto.getIsEnable());
        entity.setDescription(dto.getDescription());
        entity.setAdminId(dto.getAdminId());
        return entity;
    }

    public UserDto entityToDTO(User source) {
        try {
            return modelMapper.map(source, UserDto.class);
        } catch (Exception e) {
            log.warn("Converting from Entity to DTO is failed");
        }
        return null;
    }
    public User dtoToEntity(UserDto source) {
        try {
            return modelMapper.map(source, User.class);
        } catch (Exception e) {
            log.warn("Converting from DTO to Entity is failed");
        }
        return null;
    }

}
