package com.group1.studentprojectportal.controller;

import com.group1.studentprojectportal.constant.AppContants;
import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.UserRequest;
import com.group1.studentprojectportal.payload.UserResponse;
import com.group1.studentprojectportal.service.impl.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@Slf4j
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(
            Authentication authentication) {
        log.info("current user");
        return userService.getCurrentUser(authentication);
    }

    @GetMapping
    public ResponseEntity<PagedResponse<UserResponse>> getUsers(
            @RequestParam(name = "page", required = false,
                    defaultValue = AppContants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false,
                    defaultValue = AppContants.DEFAULT_PAGE_SIZE) Integer size,
            @RequestParam(name = "name", required = false,
                    defaultValue = AppContants.DEFAULT_NAME) String name,
            @RequestParam(name = "role", required = false,
                    defaultValue = AppContants.DEFAULT_ROLE) String role,
            @RequestParam(name = "status", required = false,
                    defaultValue = AppContants.DEFAULT_STATUS) String status,
            @RequestParam(name = "sortBy", required = false,
                    defaultValue = AppContants.DEFAULT_SORT_BY) String sortBy,
            @RequestParam(name = "order", required = false,
                    defaultValue = AppContants.DEFAULT_ORDER) String order
    ) {
        log.info("all user");
        return userService.getAllUsers(page, size, name, role, status, sortBy, order);
    }

    @PostMapping
    public ResponseEntity<UserResponse> addUser(@RequestBody @Valid UserRequest request) {
        log.info("add user");
        return userService.addUser(request);
    }

    @GetMapping("/role/{role}/all")
    public ResponseEntity<List<UserResponse>> getUserByRole(@PathVariable String role) {
        log.info("user role");
        return userService.getUsersByRole(role.toUpperCase());
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<PagedResponse<UserResponse>> getUserByRole(
            @PathVariable String role,
            @RequestParam(name = "page", required = false, defaultValue = AppContants.DEFAULT_PAGE_NUMBER) Integer page,
            @RequestParam(name = "size", required = false, defaultValue = AppContants.DEFAULT_PAGE_SIZE) Integer size
    ) {
        log.info("user role");
        return userService.getUsersByRole(role.toUpperCase(), page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Integer id) {
        log.info("id user");
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Integer id,
            @RequestBody UserRequest request) {
        log.info("update user");
        return userService.updateUser(id, request);
    }

    @PostMapping("/{id}/status")
    public ResponseEntity<UserResponse> updateUserStatus(@PathVariable Integer id) {
        log.info("update user status");
        return userService.updateStatus(id);
    }

    @GetMapping("/{id}/verification")
    public ResponseEntity<String> sendEmailVerify(
            @PathVariable Integer id
    ) {
        return userService.sendVerifyEmail(id);
    }

    @GetMapping("/{id}/verification/{token}")
    public ResponseEntity<UserResponse> verifyUser(
            @PathVariable String id,
            @PathVariable String token,
            HttpServletResponse response
    ) throws IOException {
        response.sendRedirect("http://localhost:5173/auth/");
        return userService.verifyRegister(id, token);
    }

    @PostMapping("/password")
    public ResponseEntity<UserResponse> forgotPassword(@RequestBody UserRequest user) {
        return userService.sendResetPasswordEmail(user.getEmail());
    }

    @GetMapping("/{id}/password/{token}")
    public ResponseEntity<UserResponse> resetPassword(
            @PathVariable String id,
            @PathVariable String token,
            HttpServletResponse response
    ) throws IOException {
        response.sendRedirect("http://localhost:5173/auth/" + id + "/" + token);
        return userService.resetPassword(id, token);
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<UserResponse> updateUserPassword(
            @RequestBody UserRequest user,
            @PathVariable String id
    ) {
        return userService.updatePassword(id, user.getPassword());
    }
    @PutMapping("/{id}/avatar")
    public ResponseEntity<UserResponse> updateUserAvatar(
            @RequestBody UserRequest user,
            @PathVariable Integer id
    ) {
        return userService.updateAvatar(id, user);
    }
    @PutMapping("/{id}/password-change")
    public ResponseEntity<UserResponse> changeUserPassword(
            @RequestBody Password password,
            @PathVariable String id
    ) {
        return userService.changePassword(id, password.newPass, password.oldPass);
    }

    @GetMapping("{id}/token")
    public ResponseEntity<String> getTokenUser(
            @PathVariable String id
    ) {
        return userService.getTokenUser(id);
    }

    private record Password(String newPass, String oldPass){}
}
