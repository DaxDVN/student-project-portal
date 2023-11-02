package com.group1.studentprojectportal.payload;

import  com.fasterxml.jackson.annotation.JsonInclude;
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
public class SubjectDto {
    private Integer id;
    private String code;
    private UserDto creator;
    private UserDto manager;
    private String name;
    private Boolean isEnable;
    private Timestamp createdAt;
    private Integer updatedBy;
    private Timestamp updatedAt;
}
