package com.group1.studentprojectportal.entity;

import com.group1.studentprojectportal.constant.Roles;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @ManyToMany(mappedBy = "students")
    private Set<ClassEntity> classes = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "project_member",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private Set<Project> projects = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Roles role;

    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "full_name", nullable = false)
    private String fullName;
    @Column(name = "is_enable", nullable = false,
            columnDefinition = "boolean default false")
    private Boolean isEnable;
    @Column(name = "is_verified", nullable = false,
            columnDefinition = "boolean default false")
    private Boolean isVerified;
    @Column(name = "phone", nullable = false, length = 10)
    private String phone;
    @Column(name = "avatar", length = 500)
    private String avatar;
    @Column(name = "note")
    private String note;
    @Column(name = "token")
    private String token;
    @Column(name = "created_by")
    private Integer creator;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp created_at;
    @Column(name = "updated_by")
    private Integer adminId;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp updated_at;
}
