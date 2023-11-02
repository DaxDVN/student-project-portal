package com.group1.studentprojectportal.payload.dto;

import com.group1.studentprojectportal.payload.UserResponse;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDto {

    private Integer id;
    @NotNull
    private String code;
    @NotNull
    private UserResponse adminDto;
    @NotNull
    private UserResponse managerDto;
    @NotNull
    private String name;
    private Boolean isEnable;

}
