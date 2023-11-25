package com.group1.studentprojectportal.service.impl;

import com.group1.studentprojectportal.constant.ClassStatuses;
import com.group1.studentprojectportal.constant.Roles;
import com.group1.studentprojectportal.entity.ClassEntity;
import com.group1.studentprojectportal.entity.Subject;
import com.group1.studentprojectportal.entity.User;
import com.group1.studentprojectportal.exception.ResourceNotFoundException;
import com.group1.studentprojectportal.payload.*;
import com.group1.studentprojectportal.repository.IClassRepository;
import com.group1.studentprojectportal.repository.IUserRepository;
import com.group1.studentprojectportal.service.IClassService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClassService implements IClassService {
    private final static Logger log =
            LoggerFactory.getLogger(ClassService.class);
    private final IClassRepository classRepository;
    private final IUserRepository userRepository;
    private final UserService userService;

    public ClassService(
            IClassRepository classRepository,
            IUserRepository userRepository,
            UserService userService) {
        this.classRepository = classRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public ResponseEntity<ClassDto> addClass(ClassDto request) {
        ClassEntity classEntity = dtoToEntity(request);
        if (classRepository.existsByIdOrCode(
                classEntity.getId(), classEntity.getCode())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        ClassEntity newClass = classRepository.save(classEntity);
        return new ResponseEntity<>(entityToDTO(newClass), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PagedResponse<ClassDto>> getAllClasses(Integer page, Integer size) {
        Pageable pageable =
                PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<ClassEntity> classPage = classRepository.findAll(pageable);
        return getPagedResponseEntity(classPage);
    }

    @Override
    public ResponseEntity<PagedResponse<ClassDto>> getAllClasses(
            Integer page, Integer size, String code, String managerEmail,
            String status, String semester, String sortBy, String order
    ) {
        if (semester.isEmpty() || semester.equalsIgnoreCase("All Semester")){
            semester = null;
        }
        Sort.Direction sort = (order.equals("descend")) ? Sort.Direction.DESC : Sort.Direction.ASC;
        String classCode = (code.isEmpty()) ? null : code;
        User manager = userRepository.findUserByEmail(managerEmail.trim());
        Pageable pageable = PageRequest.of(page, size, sort, sortBy);
        Page<ClassEntity> classEntityPage = classRepository.findClassesWithFilters(classCode, semester, manager,
                (status.equals("All Status")) ? null : ClassStatuses.valueOf(status),
                pageable);

        if (classEntityPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<ClassDto> classDTOs = classEntityPage.getContent().stream().map(this::entityToDTO).toList();
        PagedResponse<ClassDto> classDTOPage = new PagedResponse<>(classDTOs, classEntityPage.getNumber(),
                classEntityPage.getSize(), classEntityPage.getTotalElements(),
                classEntityPage.getTotalPages(), classEntityPage.isLast());

        return new ResponseEntity<>(classDTOPage, HttpStatus.OK);
    }

    @Override
    public List<UserResponse> getAllManagers() {
        List<Integer> managerIds = classRepository.findAllManagerIds();
        List<User> managers = new ArrayList<>();
        managerIds.forEach(
                (id) -> {
                    managers.add(userRepository.findUserById(id));
                }
        );
        return managers.stream().map(userService::entityToResponse).toList();
    }

    @Override
    public ResponseEntity<PagedResponse<UserResponse>> getAllStudentNotInSpecificClass(Integer classId, Integer page, Integer size){
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "id");
        Page<User> studentList = classRepository.findStudentsNotInClass(Roles.STUDENT, classId, pageable);
        if (studentList.getNumberOfElements() == 0) {
            PagedResponse<UserResponse> userList =
                    new PagedResponse<>(Collections.emptyList(), studentList.getNumber(),
                            studentList.getSize(), studentList.getTotalElements(),
                            studentList.getTotalPages(), studentList.isLast());
            return new ResponseEntity<>(userList, HttpStatus.NOT_FOUND);
        }
        List<UserResponse> userResponses =
                studentList.getContent().stream()
                        .map(userService::entityToResponse).toList();

        PagedResponse<UserResponse> userList =
                new PagedResponse<>(userResponses, studentList.getNumber(),
                        studentList.getSize(), studentList.getTotalElements(),
                        studentList.getTotalPages(), studentList.isLast());
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ClassDto> getClassById(Integer id) {
        ClassEntity classEntity =
                classRepository.findClassEntityById(id).orElseThrow(
                        () -> new ResourceNotFoundException("Class not found"));
        return new ResponseEntity<>(entityToDTO(classEntity), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PagedResponse<ClassDto>> getClassesBySubject(
            Integer id, Integer page, Integer size) {
        Pageable pageable =
                PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<ClassEntity> classPage = classRepository.findClassEntitiesBySubject_Id(id, pageable);
        return getPagedResponseEntity(classPage);
    }
    @Override
    public ResponseEntity<List<ClassDto>> getClassByUser(Integer id) {
        List<ClassEntity> list = userRepository.findClassesByUserId(id);
        List<ClassDto> listResponse = list.stream().map(this::entityToDTO).toList();
        return new ResponseEntity<>(listResponse, HttpStatus.OK);
    }
    @Override
    public ResponseEntity<PagedResponse<ClassDto>> getClassesByManager(
            Integer id, Integer page, Integer size) {
        Pageable pageable =
                PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<ClassEntity> classPage = classRepository.findClassesByManagerId(id, pageable);
        return getPagedResponseEntity(classPage);
    }
    @Override
    public ResponseEntity<List<ClassDto>> getClassesByManager(Integer id) {
        List<ClassEntity> classEntities = classRepository.findClassesByManagerId(id);
        List<ClassDto> classDtos = classEntities.stream().map(this::entityToDTO).toList();
        return new ResponseEntity<>(classDtos, HttpStatus.OK);
    }

    private ResponseEntity<PagedResponse<ClassDto>> getPagedResponseEntity(Page<ClassEntity> classPage) {
        if (classPage.getNumberOfElements() == 0) {
            PagedResponse<ClassDto> test =
                    new PagedResponse<>(Collections.emptyList(), classPage.getNumber(),
                            classPage.getSize(), classPage.getTotalElements(),
                            classPage.getTotalPages(), classPage.isLast());
            return new ResponseEntity<>(test, HttpStatus.NOT_FOUND);
        }
        List<ClassDto> classDtos =
                classPage.getContent()
                        .stream().map(this::entityToDTO).toList();
        PagedResponse<ClassDto> test =
                new PagedResponse<>(classDtos, classPage.getNumber(),
                        classPage.getSize(), classPage.getTotalElements(),
                        classPage.getTotalPages(), classPage.isLast());
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ClassDto> updateClass(Integer id, ClassDto request) {
        ClassEntity classEntity = dtoToEntity(request);
        if (!classRepository.existsByIdOrCode(id, null)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ClassEntity classEntityOld =
                classRepository.findClassEntityById(id).orElseThrow(
                        () -> new ResourceNotFoundException("Class not found"));
        classEntityOld.setCode(classEntity.getCode());
        classEntityOld.setCreator(classEntity.getCreator());
        classEntityOld.setSubject(classEntity.getSubject());
        classEntityOld.setManager(classEntity.getManager());
        classEntityOld.setDetail(classEntity.getDetail());
        classEntityOld.setStatus(classEntity.getStatus());
        classEntityOld.setUpdatedAt(getUpdateTime());
        classEntityOld.setSemester(classEntity.getSemester());
        ClassEntity newClass = classRepository.save(classEntityOld);
        return new ResponseEntity<>(
                entityToDTO(newClass), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<PagedResponse<ClassDto>> deleteClassById(Integer id) {
        ClassEntity classEntity = classRepository.findClassEntityById(id).orElseThrow(
                () -> new ResourceNotFoundException("Class not found")
        );
        classRepository.delete(classEntity);
        return getAllClasses(0, 5);
    }

    @Override
    public ResponseEntity<ClassDto> updateStatus(Integer id) {
        if (!classRepository.existsByIdOrCode(id, null)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        ClassEntity classEntity = classRepository.findClassEntityById(id).orElseThrow();
        classEntity.setStatus(ClassStatuses.CANCELLED);
        ClassEntity classCancel = classRepository.save(classEntity);
        return new ResponseEntity<>(entityToDTO(classCancel), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ClassDto> addStudentToClass(Integer id, List<UserRequest> studentList) {
        ClassEntity classEntity =
                classRepository.findClassEntityById(id).orElseThrow(
                        () -> new ResourceNotFoundException("Class not found"));
        Set<User> students = userRepository.findByClasses(classEntity);
        studentList.forEach(
                el -> {
                    User user = userRepository.findUserById(el.getId());
                    students.add(user);
                }
        );
        classEntity.setStudents(students);
        ClassEntity newClass = classRepository.save(classEntity);
        return new ResponseEntity<>(
                entityToDTO(newClass), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ClassDto> removeStudentFromClass(Integer id, List<UserRequest> studentList) {
        ClassEntity classEntity =
                classRepository.findClassEntityById(id).orElseThrow(
                        () -> new ResourceNotFoundException("Class not found"));
        Set<User> students = userRepository.findByClasses(classEntity);
        studentList.forEach(
                el -> {
                    User user = userRepository.findUserById(el.getId());
                    students.remove(user);
                }
        );
        classEntity.setStudents(students);
        ClassEntity newClass = classRepository.save(classEntity);
        return new ResponseEntity<>(
                entityToDTO(newClass), HttpStatus.OK);
    }

    //  =======-------=======-------sub-function-------=======-------=======
    private ClassDto entityToDTO(ClassEntity source) {
        UserDto creator = new UserDto();
        UserDto manager = new UserDto();
        SubjectDto subject = new SubjectDto();
        Set<User> studentsInSource = userRepository.findByClasses(source);
        source.setStudents(studentsInSource);

        Set<UserDto> students = source.getStudents()
                .stream().map((el) -> {
                    UserDto userDTO = new UserDto();
                    userDTO.setId(el.getId());
                    return userDTO;
                })
                .collect(Collectors.toSet());

        creator.setId(source.getCreator().getId());
        manager.setId(source.getManager().getId());
        subject.setId(source.getSubject().getId());
        return ClassDto.builder()
                .id(source.getId())
                .code(source.getCode())
                .semester(source.getSemester())
                .creator(creator)
                .students(students)
                .subject(subject)
                .manager(manager)
                .detail(source.getDetail())
                .createdAt(source.getCreatedAt())
                .adminId(source.getAdminId())
                .updatedAt(source.getUpdatedAt())
                .status(source.getStatus())
                .build();
    }

    private ClassEntity dtoToEntity(ClassDto source) {
        User creator = new User();
        User manager = new User();
        Subject subject = new Subject();
        Set<User> students = source.getStudents()
                .stream().map((el) -> {
                    User user = new User();
                    user.setId(el.getId());
                    return user;
                })
                .collect(Collectors.toSet());
        creator.setId(source.getCreator().getId());
        manager.setId(source.getManager().getId());
        subject.setId(source.getSubject().getId());
        return ClassEntity.builder()
                .semester(source.getSemester())
                .code(source.getCode())
                .creator(creator)
                .students(students)
                .subject(subject)
                .manager(manager)
                .detail(source.getDetail())
                .createdAt(source.getCreatedAt())
                .adminId(source.getAdminId())
                .updatedAt(source.getUpdatedAt())
                .status(source.getStatus() == null
                        ? ClassStatuses.PENDING : source.getStatus())
                .build();
    }

    public Timestamp getUpdateTime() {
        TimeZone vietnamTimeZone = TimeZone.getTimeZone("Asia/Saigon");
        SimpleDateFormat vietnamDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        vietnamDateFormat.setTimeZone(vietnamTimeZone);
        return new Timestamp(System.currentTimeMillis());
    }
}
