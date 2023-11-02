package com.group1.studentprojectportal.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.group1.studentprojectportal.payload.dto.ClassDto;
import com.group1.studentprojectportal.payload.UserDto;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDto {
    private Integer id;
    private UserDto creator;
    @NotNull
    private ClassDto classDto;
    private Set<UserDto> members;
    @NotNull
    private UserDto mentor;
    private UserDto leader;
    private Boolean isActive;
    private String projectName;
    private String groupName;
    private String title;
    private String description;
}
