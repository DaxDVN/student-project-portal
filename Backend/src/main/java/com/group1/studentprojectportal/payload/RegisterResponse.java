package com.group1.studentprojectportal.payload;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponse {
    private String response;
    private UserResponse user;
}
