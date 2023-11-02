package com.group1.studentprojectportal.payload.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.group1.studentprojectportal.constant.ClassStatuses;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

/**
 * DTO for {@link com.group1.studentprojectportal.entity.ClassEntity}
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClassDto {
    private Integer id;
    private String code;
    @NotNull
    private UserDto creator;
    private Set<UserDto> students;
    @NotNull
    private SubjectDto subject;
    @NotNull
    private UserDto manager;
    private ClassStatuses status;
    private String detail;
    private Integer userId;
}