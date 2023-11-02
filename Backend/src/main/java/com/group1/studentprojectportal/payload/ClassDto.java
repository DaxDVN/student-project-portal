package com.group1.studentprojectportal.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.group1.studentprojectportal.constant.ClassStatuses;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClassDto {
    private Integer id;
    private String code;
    private UserDto creator;
    private Set<UserDto> students;
    private SubjectDto subject;
    private UserDto manager;
    private ClassStatuses status;
    private String detail;
    private Timestamp createdAt;
    private Integer adminId;
    private Timestamp updatedAt;
    private String semester;
}
