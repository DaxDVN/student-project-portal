package com.group1.studentprojectportal.service;

import com.group1.studentprojectportal.payload.JwtAuthResponse;
import com.group1.studentprojectportal.payload.UserRequest;
import com.group1.studentprojectportal.payload.RegisterResponse;
import org.springframework.http.ResponseEntity;

public interface IAuthService {
    ResponseEntity<JwtAuthResponse> login(UserRequest loginDto);
    ResponseEntity<RegisterResponse> register(UserRequest registerDto);
}
