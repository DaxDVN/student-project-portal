package com.group1.studentprojectportal.payload;

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
public class ProjectDto {
    private Integer id;
    private Integer creatorId;
    private Integer classId;
    private Set<Integer> memberIds;
    private Integer mentorId;
    private Integer leaderId;
    private Boolean isActive;
    private String projectName;
    private String groupName;
    private String title;
    private String description;
    private Timestamp created_at;
    private String updatedBy;
    private Timestamp updated_at;
    private String createdBy;
}