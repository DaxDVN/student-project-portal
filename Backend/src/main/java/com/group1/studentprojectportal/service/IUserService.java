package com.group1.studentprojectportal.service;


import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.UserRequest;
import com.group1.studentprojectportal.payload.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface IUserService {
    ResponseEntity<UserResponse> updateAvatar(Integer id, UserRequest user);

    ResponseEntity<PagedResponse<UserResponse>> getAllUsers(Integer page, Integer size, String name, String role, String status, String sortBy, String order);

    ResponseEntity<PagedResponse<UserResponse>> getStudentsWithinClass(Integer classId, Integer page, Integer size);

    ResponseEntity<PagedResponse<UserResponse>> getUsersByRole(String role, Integer page, Integer size);

    ResponseEntity<List<UserResponse>> getUsersByRole(String role);

    ResponseEntity<UserResponse> getUserById(Integer id);

    ResponseEntity<UserResponse> updateUser(Integer id, UserRequest updateInfo);

    ResponseEntity<UserResponse> addUser(UserRequest infoCreate);

    ResponseEntity<UserResponse> verifyRegister(String idEncoded, String tokenEncoded);

    ResponseEntity<UserResponse> updatePassword(String idUser, String newPassword);

    ResponseEntity<UserResponse> updateStatus(Integer id);

    ResponseEntity<UserResponse> sendResetPasswordEmail(String email);

    ResponseEntity<UserResponse> resetPassword(String idEncoded, String tokenEncoded);

    ResponseEntity<String> sendVerifyEmail(Integer id);

    ResponseEntity<UserResponse> getCurrentUser(Authentication authentication);

    ResponseEntity<String> getTokenUser(String id);

    ResponseEntity<UserResponse> changePassword(String id, String newPass, String oldPass);
}
