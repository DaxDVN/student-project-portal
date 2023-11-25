package com.group1.studentprojectportal.service.impl;

import com.group1.studentprojectportal.entity.Subject;
import com.group1.studentprojectportal.entity.User;
import com.group1.studentprojectportal.payload.PagedResponse;
import com.group1.studentprojectportal.payload.SubjectDto;
import com.group1.studentprojectportal.payload.UserDto;
import com.group1.studentprojectportal.repository.ISubjectRepository;
import com.group1.studentprojectportal.repository.IUserRepository;
import com.group1.studentprojectportal.service.ISubjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.List;
import java.util.TimeZone;

@Service
public class SubjectService implements ISubjectService {
    private final static Logger log =
            LoggerFactory.getLogger(SubjectService.class);
    private final ISubjectRepository subjectRepository;
    private final IUserRepository userRepository;

    public SubjectService(
            ISubjectRepository subjectRepository, IUserRepository userRepository) {
        this.subjectRepository = subjectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<SubjectDto> addSubject(
            SubjectDto request,
            Authentication authentication
    ) {
        User user = userRepository.findUserByEmail(authentication.getName());
        UserDto creator = new UserDto();
        creator.setId(user.getId());
        request.setCreator(creator);
        Subject subject = dtoToEntity(request);
        if (subjectRepository.existsByIdOrCode(
                subject.getId(), subject.getCode())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        subject.setIsEnable(request.getIsEnable());
        Subject newSubject = subjectRepository.save(subject);
        return new ResponseEntity<>(entityToDTO(newSubject), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<PagedResponse<SubjectDto>> getAllSubjects(
            Integer page, Integer size, String name,
            String managerEmail, String status, String sortBy, String order
    ) {
        Sort.Direction sort;
        String subjectName = "";

        if (order.equals("descend")) {
            sort = Sort.Direction.DESC;
        } else {
            sort = Sort.Direction.ASC;
        }
        if (!name.isEmpty()) {
            subjectName = name;
        }

        while (page >= 0) {
            Pageable pageable = PageRequest.of(page, size, sort, sortBy);

            Page<Subject> subjectPage;
            User manager = userRepository.findUserByEmail(managerEmail.trim());
            if (status.equals("All Status")) {
                if (managerEmail.trim().isEmpty()) {
                    subjectPage = subjectRepository
                            .findSubjectByNameContaining(subjectName, pageable);
                } else {
                    subjectPage = subjectRepository
                            .findSubjectByManagerAndNameContaining(manager, subjectName,  pageable);
                }
            } else {
                boolean isEnabled = status.equalsIgnoreCase("Enable");
                if (manager == null) {
                    subjectPage = subjectRepository
                            .findSubjectByIsEnableAndNameContaining(isEnabled, subjectName, pageable);
                    System.out.println(subjectPage.getTotalElements());
                } else {
                    subjectPage = subjectRepository.findSubjectByIsEnableAndManagerAndNameContaining(
                            isEnabled, manager, subjectName, pageable
                    );
                }
            }
            if (subjectPage.getNumberOfElements() == 0) {
                PagedResponse<SubjectDto> test =
                        new PagedResponse<>(Collections.emptyList(), subjectPage.getNumber(),
                                subjectPage.getSize(), subjectPage.getTotalElements(),
                                subjectPage.getTotalPages(), subjectPage.isLast());
                return new ResponseEntity<>(test, HttpStatus.NOT_FOUND);
            }

            List<SubjectDto> subjectDTOS = subjectPage.getContent().stream().map(this::entityToDTO).toList();
            PagedResponse<SubjectDto> test =
                    new PagedResponse<>(subjectDTOS, subjectPage.getNumber(),
                            subjectPage.getSize(), subjectPage.getTotalElements(),
                            subjectPage.getTotalPages(), subjectPage.isLast());
            if (subjectPage.isEmpty() && page != 0) {
                page = 0;
                continue;
            }
            return new ResponseEntity<>(test, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<List<SubjectDto>> getSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        List<SubjectDto> subjectDTOS = subjects.stream().map(this::entityToDTO).toList();
        return new ResponseEntity<>(subjectDTOS, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SubjectDto> getSubjectById(Integer id) {
        Subject subject = subjectRepository.findSubjectById(id);
        if (subject != null) {
            return new ResponseEntity<>(
                    entityToDTO(subject), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<SubjectDto> updateSubject(Integer id, SubjectDto request) {
        Subject subject;

        subject = dtoToEntity(request);
        if (!subjectRepository.existsByIdOrCode(id, null)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Subject subjectOld = subjectRepository.findSubjectById(id);
//      update subject info
        subjectOld.setName(subject.getName());
        subjectOld.setCode(subject.getCode());
        subjectOld.setManager(subject.getManager());
        subjectOld.setUpdatedBy(subject.getUpdatedBy());
        subjectOld.setUpdatedAt(getUpdateTime());
        subjectOld.setIsEnable(subject.getIsEnable());
        subjectRepository.save(subjectOld);
        return new ResponseEntity<>(
                entityToDTO(subjectOld), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SubjectDto> deleteSubjectById(Integer id) {
        Subject subject = subjectRepository.findSubjectById(id);
        subjectRepository.deleteById(id);
        if (!subjectRepository.existsByIdOrCode(id, null)) {
            return new ResponseEntity<>(
                    entityToDTO(subject), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<SubjectDto> updateStatus(Integer id) {
        if (subjectRepository.existsByIdOrCode(id, null)) {
            Subject subject = subjectRepository.findSubjectById(id);
//          active => de-active and revert
            subject.setIsEnable(!subject.getIsEnable());
            Subject newSubject = subjectRepository.save(subject);
            return new ResponseEntity<>(
                    entityToDTO(newSubject), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //  =======-------=======-------sub-function-------=======-------=======
    private SubjectDto entityToDTO(Subject source) {
        UserDto creator = new UserDto();
        UserDto manager = new UserDto();
        creator.setId(source.getCreator().getId());
        manager.setId(source.getManager().getId());
        return SubjectDto.builder()
                .id(source.getId())
                .code(source.getCode())
                .name(source.getName())
                .creator(creator)
                .manager(manager)
                .isEnable(source.getIsEnable())
                .updatedBy(source.getUpdatedBy())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();
    }

    private Subject dtoToEntity(SubjectDto source) {
        Subject target = new Subject();
        User creator = new User();
        User manager = new User();
        creator.setId(source.getCreator() != null ? source.getCreator().getId() : null);
        manager.setId(source.getManager().getId());
        target.setIsEnable(source.getIsEnable());
        return Subject.builder()
                .code(source.getCode())
                .name(source.getName())
                .creator(creator)
                .manager(manager)
                .isEnable(target.getIsEnable())
                .updatedBy(source.getUpdatedBy())
                .createdAt(source.getCreatedAt())
                .updatedAt(source.getUpdatedAt())
                .build();
    }

    public Timestamp getUpdateTime() {
        TimeZone vietnamTimeZone = TimeZone.getTimeZone("Asia/Saigon");
        SimpleDateFormat vietnamDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        vietnamDateFormat.setTimeZone(vietnamTimeZone);

        return new Timestamp(System.currentTimeMillis());
    }
}
