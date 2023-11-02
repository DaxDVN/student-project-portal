package com.group1.studentprojectportal.payload.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Set;

/**
 * DTO for {@link com.group1.studentprojectportal.entity.Project}
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDto implements Serializable {
    private Integer id;
    @NotNull
    private UserDto creator;
    @NotNull

     ClassDto classDto;
    private Set<UserDto> members;
    @NotNull
    private UserDto mentor;
    private UserDto leader;
    private Boolean isActive;
    private String projectName;
    private String groupName;
    private String title;
    private String description;
    private Integer userId;
}