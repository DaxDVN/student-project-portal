package com.group1.studentprojectportal.service;

import com.group1.studentprojectportal.payload.UserRequest;
import com.group1.studentprojectportal.payload.JwtAuthResponse;
import org.springframework.http.ResponseEntity;

public interface IIssueService {
    ResponseEntity<JwtAuthResponse> login(UserRequest loginDto);
    ResponseEntity<String> register(UserRequest registerDto);
}
