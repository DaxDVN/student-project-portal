package com.group1.studentprojectportal.service.impl;

import com.group1.studentprojectportal.constant.Roles;
import com.group1.studentprojectportal.entity.User;
import com.group1.studentprojectportal.payload.JwtAuthResponse;
import com.group1.studentprojectportal.payload.RegisterResponse;
import com.group1.studentprojectportal.payload.UserRequest;
import com.group1.studentprojectportal.payload.UserResponse;
import com.group1.studentprojectportal.repository.IUserRepository;
import com.group1.studentprojectportal.security.JwtTokenProvider;
import com.group1.studentprojectportal.service.IAuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService implements IAuthService {

    private final AuthenticationManager authenticationManager;
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(
            AuthenticationManager authenticationManager,
            IUserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public ResponseEntity<JwtAuthResponse> login(UserRequest loginDto) {
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginDto.getEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findUserByEmail(loginDto.getEmail());

        String token = jwtTokenProvider.generateToken(authentication, user.getRole());
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        jwtAuthResponse.setEnable(user.getIsEnable());
        jwtAuthResponse.setVerified(user.getIsVerified());
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);

    }

    @Override
    public ResponseEntity<RegisterResponse> register(UserRequest registerDto) {
        // add check email for exist
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>(new RegisterResponse("Already exist!", null), HttpStatus.LOOP_DETECTED);
        }
        User user = new User();
        user.setFullName(registerDto.getFullName());
        user.setPhone(registerDto.getPhone());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setRole(Roles.STUDENT);
        user.setIsEnable(false);
        user.setIsVerified(false);
        User newUser = userRepository.save(user);
        UserResponse userResponse = new UserResponse();
        userResponse.setId(newUser.getId());
        return new ResponseEntity<>(new RegisterResponse("Register successfully!", userResponse), HttpStatus.OK);
    }
}
