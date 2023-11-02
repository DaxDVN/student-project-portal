package com.group1.studentprojectportal.repository;

import com.group1.studentprojectportal.constant.SystemSettings;
import com.group1.studentprojectportal.entity.SystemSetting;
import com.group1.studentprojectportal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ISystemSettingRepository extends JpaRepository<SystemSetting, Integer> {
    boolean existsById(Integer id);
    boolean existsByName(String name);
    Optional<SystemSetting> findById(Integer id);
    Page<SystemSetting> findAllBySettingGroup(SystemSettings settingGroup, Pageable pageable);
    List<SystemSetting> findAllBySettingGroup(SystemSettings settingGroup);
}
