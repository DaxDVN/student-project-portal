package com.group1.studentprojectportal.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.group1.studentprojectportal.constant.Roles;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.sql.Timestamp;


@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    private Integer id;
    @NotNull
    @Email
    @NotBlank(message = "Email is mandatory")
    private String email;
    @NotNull
    @NotBlank(message = "Name is mandatory")
    private String fullName;
    private Boolean isEnable;
    private Boolean isVerified;
    @NotNull
    @Size(max = 10)
    private String phone;
    private String avatar;
    private String note;
    private Roles role;
    private Integer creator;
    private Timestamp created_at;
    private Integer adminId;
    private Timestamp updated_at;
}
