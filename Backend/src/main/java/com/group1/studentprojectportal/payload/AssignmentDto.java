package com.group1.studentprojectportal.payload;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.group1.studentprojectportal.payload.SubjectDto;
import com.group1.studentprojectportal.entity.Assignment;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * DTO for {@link Assignment}
 */
@Getter
@Setter
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AssignmentDto {
    Integer id;
    Integer creatorId;
    String creatorName;
    Integer subjectId;
    String subjectName;
    String title;
    String description;
    Integer userId;
    Timestamp date;
}