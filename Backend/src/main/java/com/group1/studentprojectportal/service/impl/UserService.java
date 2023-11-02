package com.group1.studentprojectportal.service.impl;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.studentprojectportal.constant.Roles;
import com.group1.studentprojectportal.entity.User;
import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.UserRequest;
import com.group1.studentprojectportal.payload.UserResponse;
import com.group1.studentprojectportal.repository.IUserRepository;
import com.group1.studentprojectportal.service.IUserService;
import com.group1.studentprojectportal.util.DataEncrypt;
import com.group1.studentprojectportal.util.DataRandomGenerator;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
public class UserService implements IUserService {

    private final static Logger log = LoggerFactory.getLogger(UserService.class);
    final ModelMapper modelMapper = new ModelMapper();
    private final DataEncrypt dataEncrypt;
    private final CommonService commonService;
    private final DataRandomGenerator dataRandomGenerator;
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public UserService(
            AuthenticationManager authenticationManager,
            DataEncrypt dataEncrypt,
            CommonService commonService,
            DataRandomGenerator dataRandomGenerator,
            IUserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.dataEncrypt = dataEncrypt;
        this.commonService = commonService;
        this.dataRandomGenerator = dataRandomGenerator;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ResponseEntity<UserResponse> verifyRegister(String idEncoded, String tokenEncoded) {
        String idDecode = dataEncrypt.base64Decode(idEncoded);
        String tokenDecode = dataEncrypt.base64Decode(tokenEncoded);
        UserResponse userResponse;
        try {
            Integer idUser = Integer.parseInt(idDecode);
            log.info("{}", idUser);
//            set user verified and enable
            User user = userRepository.findUserById(idUser);
            if (tokenDecode.equalsIgnoreCase(user.getToken())) {
                user.setIsVerified(true);
                user.setIsEnable(true);
                userRepository.save(user);
                userResponse = entityToResponse(user);
                return new ResponseEntity<>(userResponse, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<UserResponse> addUser(UserRequest request) {
        @Valid User user;
        UserResponse userResponse;
//      Map info create to user object
        user = requestToEntity(request);
        user = preprocessingInfo(user);
        log.info("{}", user);
        boolean userCheck = userRepository.existsByEmail(user.getEmail());
//      if exist, return conflict response 409 status
        if (userCheck) {
            return new ResponseEntity<>(HttpStatus.LOOP_DETECTED);
        }
        User newUser = userRepository.save(user);
        userResponse = entityToResponse(newUser);
//            if create successfully, return 201 created status
        if (userResponse != null) {
            return new ResponseEntity<>(userResponse, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.REQUEST_TIMEOUT);
    }

    @Override
    public ResponseEntity<UserResponse> sendResetPasswordEmail(String email) {
        User user = userRepository.findUserByEmail(email);
        UserResponse userResponse = null;
        try {
            String tokenRandom = dataRandomGenerator.generateStringRandom();
            user.setToken(tokenRandom);
            userRepository.save(user);
            String urlLink =
                    "http://localhost:8080/api/users/"
                            + dataEncrypt.base64Encode(String.valueOf(user.getId()))
                            + "/password/" + dataEncrypt.base64Encode(tokenRandom);
            String subject = "Reset your password";

            String body = "<h1> Hello my friend, are you reset your password? " +
                    "<br/> Click here and update your password: " +
                    "<a href =\"" + urlLink + "\">Reset password</a></h1>";
            sendMailVerification(
                    user.getEmail(), subject, body
            );
            userResponse = entityToResponse(user);
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } catch (Exception e) {
            log.warn("{}", e.getMessage());
            return new ResponseEntity<>(userResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<String> sendVerifyEmail(Integer id) {
        User user = userRepository.findUserById(id);
        String tokenRandom = dataRandomGenerator.generateStringRandom();
        user.setToken(tokenRandom);
        userRepository.save(user);
        String urlLink =
                "http://localhost:8080/api/users/"
                        + dataEncrypt.base64Encode(String.valueOf(user.getId()))
                        + "/verification/"
                        + dataEncrypt.base64Encode(tokenRandom);
//            send email
        String body = "<h1> Welcome to APM. <br> LET <a href =\""
                + urlLink + "\">VERIFY</a> AND EXPERIENCE EVERYTHING</h1>";
        sendMailVerification(
                user.getEmail(), "Verify your account", body
        );
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<UserResponse> resetPassword(String idEncoded, String tokenEncoded) {
        String idDecode = dataEncrypt.base64Decode(idEncoded);
        String tokenDecode = dataEncrypt.base64Decode(tokenEncoded);
        UserResponse userResponse;

        Integer idUser = Integer.parseInt(idDecode);
//            set user verified and enable
        User user = userRepository.findUserById(idUser);
        if (tokenDecode.equalsIgnoreCase(user.getToken())) {
            userResponse = entityToResponse(user);
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<UserResponse> getCurrentUser(
            Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findUserByEmail(email);
        if (user != null) {
            return new ResponseEntity<>(entityToResponse(user), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<String> getTokenUser(String id) {
        try {
            String idDecode = dataEncrypt.base64Decode(id);
            User user = userRepository.findUserById(Integer.parseInt(idDecode));
            if (user == null) {
                return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(user.getToken(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<UserResponse> updatePassword(String idUser, String newPassword) {
        String idDecode = dataEncrypt.base64Decode(idUser);
        User userDB = userRepository.findUserById(Integer.parseInt(idDecode));
//            Encrypt the login password with SHA256
        String passwordEncrypt = passwordEncoder.encode(newPassword.trim());
        userDB.setPassword(passwordEncrypt);
        String tokenRandom = dataRandomGenerator.generateStringRandom();
        userDB.setToken(tokenRandom);
        User user = userRepository.save(userDB);
        UserResponse userResponse = entityToResponse(user);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }
    @Override
    public ResponseEntity<UserResponse> updateAvatar(Integer id, UserRequest user) {
        User userDB = userRepository.findUserById(id);
        userDB.setAvatar(user.getAvatar());
        User newUser = userRepository.save(userDB);
        return new ResponseEntity<>(entityToResponse(newUser), HttpStatus.OK);
    }



    @Override
    public ResponseEntity<PagedResponse<UserResponse>> getAllUsers(
            Integer page, Integer size, String name,
            String role, String status, String sortBy, String order
    ) {
        Sort.Direction sort;
        Roles roles = null;
        String fullName = "";
        boolean isVerified = false;
        boolean isEnabled = false;
        if (order.equals("descend")) {
            sort = Sort.Direction.DESC;
        } else {
            sort = Sort.Direction.ASC;
        }

        if (!role.equals("All Role")) {
            roles = Roles.valueOf(role.toUpperCase());
        }

        if (!name.isEmpty()) {
            fullName = name;
        }
        switch (status) {
            case "Active":
                isEnabled = true;
                isVerified = true;
                break;
            case "Deactive":
                isVerified = true;
                break;
            default:
                break;
        }

        while (page >= 0){
            Pageable pageable = PageRequest.of(page, size, sort, sortBy);
            Page<User> userPage;
            if (status.equals("All Status")) {
                if (roles != null) {
                    userPage = userRepository
                            .findUsersByFullNameContainingAndRole(fullName, roles, pageable);
                } else {
                    userPage = userRepository
                            .findByFullNameContaining(fullName, pageable);
                }
            } else {
                if (roles != null) {
                    userPage = userRepository
                            .findUsersByIsEnableAndIsVerifiedAndRoleAndFullNameContaining(
                                    isEnabled, isVerified, roles, fullName, pageable
                            );
                } else {
                    userPage = userRepository
                            .findUsersByIsEnableAndIsVerifiedAndFullNameContaining(
                                    isEnabled, isVerified, fullName, pageable
                            );
                }
            }
            if (userPage.isEmpty() && page != 0){
                page = 0;
                continue;
            }

            return getPagedResponseResponseEntity(userPage);
        }
        return getPagedResponseResponseEntity(null);
    }

    private ResponseEntity<PagedResponse<UserResponse>> getPagedResponseResponseEntity(Page<User> userPage) {
        if (userPage == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (userPage.getNumberOfElements() == 0) {
            PagedResponse<UserResponse> userList =
                    new PagedResponse<>(Collections.emptyList(), userPage.getNumber(),
                            userPage.getSize(), userPage.getTotalElements(),
                            userPage.getTotalPages(), userPage.isLast());
            return new ResponseEntity<>(userList, HttpStatus.NOT_FOUND);
        }

        List<UserResponse> userResponses =
                userPage.getContent().stream()
                        .map(this::entityToResponse).toList();


        PagedResponse<UserResponse> userList =
                new PagedResponse<>(userResponses, userPage.getNumber(),
                        userPage.getSize(), userPage.getTotalElements(),
                        userPage.getTotalPages(), userPage.isLast());
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PagedResponse<UserResponse>> getStudentsWithinClass(Integer classId, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");

        Page<User> userPage = userRepository.findUsersByClasses_Id(classId, pageable);
        return getPagedResponseResponseEntity(userPage);
    }


    @Override
    public ResponseEntity<PagedResponse<UserResponse>> getUsersByRole(String role, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");

        Page<User> userPage = userRepository.findUsersByRole(Roles.valueOf(role), pageable);
        return getPagedResponseResponseEntity(userPage);
    }

    @Override
    public ResponseEntity<List<UserResponse>> getUsersByRole(String role) {
        List<User> list = userRepository.findUsersByRole(Roles.valueOf(role));
        List<UserResponse> listResponse = list.stream().map(this::entityToResponse).toList();
        return new ResponseEntity<>(listResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<UserResponse> getUserById(Integer userId) {
        User user = userRepository.findUserById(userId);
        if (user != null) {
            UserResponse userResponse = entityToResponse(user);
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<UserResponse> updateUser(Integer id, UserRequest request) {
        @Valid User user;
        user = (new ObjectMapper()).convertValue(request, User.class);
        user = preprocessingInfo(user);
        if (!Objects.equals(id, user.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (!userRepository.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User userDB = userRepository.findUserByEmail(user.getEmail());
        userDB = mapperUpdateInfo(userDB, user);
        User updatedUser = userRepository.save(userDB);
        UserResponse userResponse = entityToResponse(updatedUser);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<UserResponse> updateStatus(Integer id) {
        User user = userRepository.findUserById(id);
//            if active => de-active
        if (user != null) {
            user.setIsEnable(!user.getIsEnable());
            userRepository.save(user);
            UserResponse userResponse = entityToResponse(user);
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @Override
    public ResponseEntity<UserResponse> changePassword(String id, String newPass, String oldPass) {
        User user = userRepository.findUserById(Integer.parseInt(id));
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.getEmail(), oldPass));
        if (authentication.isAuthenticated()){
            newPass = passwordEncoder.encode(newPass.trim());
            user.setPassword(newPass);
            user = userRepository.save(user);
            return new ResponseEntity<>(entityToResponse(user), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    //  =======-------=======-------sub-function-------=======-------=======
    public User preprocessingInfo(User userInput) {
        try {
//          Encrypt the password
            String passwordEncrypt;
            if (userInput.getPassword() != null) {
                passwordEncrypt = passwordEncoder.encode(userInput.getPassword().trim());
                userInput.setPassword(passwordEncrypt);
            }
            // user register
            if (userInput.getIsVerified() == null) {
                userInput.setIsVerified(false);
                userInput.setIsEnable(false);
            }
            return userInput;
        } catch (Exception e) {
            log.warn("pre-process has been failed");
            log.warn(e.getMessage());
        }
        return null;
    }


    @Async
    public void sendMailVerification(String email, String subject, String body) {
        try {
            commonService.sendMailSender(email, subject, body);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public User mapperUpdateInfo(User before, User after) {
        if (after.getFullName() != null) {
            before.setFullName(after.getFullName());
        }
        if (after.getAvatar() != null) {
            before.setAvatar(after.getAvatar());
        }
        if (after.getPhone() != null) {
            before.setPhone(after.getPhone());
        }
        if (after.getNote() != null) {
            before.setNote(after.getNote());
        }
        if (after.getRole() != null) {
            before.setRole(after.getRole());
        }
        if (after.getAdminId() != null) {
            before.setAdminId(after.getAdminId());
        }
        return before;
    }

    public UserResponse entityToResponse(User source) {
        try {
            UserResponse userResponse = modelMapper.map(source, UserResponse.class);
            if (userResponse.getAvatar() == null) {
                userResponse.setAvatar("https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png");
            }
            return userResponse;
        } catch (Exception e) {
            log.warn("Converting from Entity to DTO is failed");
        }
        return null;
    }

    public User requestToEntity(UserRequest source) {
        try {
            return modelMapper.map(source, User.class);
        } catch (Exception e) {
            log.warn("Converting from DTO to Entity is failed");
        }
        return null;
    }


}

