package com.group1.studentprojectportal.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JwtAuthResponse {
//    private Integer id;
    private boolean isVerified;
    private boolean isEnable;
    private String accessToken;
    private String tokenType = "Bearer";
}
