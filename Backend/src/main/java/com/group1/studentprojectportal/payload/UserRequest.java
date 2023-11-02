package com.group1.studentprojectportal.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.group1.studentprojectportal.constant.Roles;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserRequest {
    private Integer id;
    @NotNull
    @Email
    @NotBlank(message = "Email is mandatory")
    private String email;
    @Size(min = 7, max = 17, message = "Invalid password")
    private String password;
    private String fullName;
    @Size(max = 10, message = "Invalid phone number")
    private String phone;
    private Boolean isEnable;
    private Boolean isVerified;
    private String avatar;
    private String note;
    private Roles role;
    private Integer adminId;
    private Integer creator;
}
