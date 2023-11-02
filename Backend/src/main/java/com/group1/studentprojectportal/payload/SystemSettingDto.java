package com.group1.studentprojectportal.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.group1.studentprojectportal.constant.SystemSettings;
import com.group1.studentprojectportal.payload.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SystemSettingDto {
    private Integer id;
    private UserDto creator;
    private SystemSettings settingGroup;
    private String name;
    private Integer displayOrder;
    private Boolean isEnable;
    private String description;
    private Integer adminId;
}
