package com.group1.studentprojectportal.controller;

import com.group1.studentprojectportal.payload.JwtAuthResponse;
import com.group1.studentprojectportal.payload.RegisterResponse;
import com.group1.studentprojectportal.payload.UserRequest;
import com.group1.studentprojectportal.service.impl.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {
    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = {"/login", "/signin"})
    public ResponseEntity<JwtAuthResponse> login(
            @RequestBody UserRequest loginDto
    ) {
        log.info("login");
        System.out.println(loginDto);
        return authService.login(loginDto);
    }

    @PostMapping(value = {"/register", "signup"})
    public ResponseEntity<RegisterResponse> register(@RequestBody UserRequest registerDto) {
        log.info("register");
        return authService.register(registerDto);
    }

}
