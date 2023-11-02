package com.group1.studentprojectportal.entity;

import com.group1.studentprojectportal.constant.ClassStatuses;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "class")
public class ClassEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "code", nullable = false, unique = true, length = 6)
    private String code;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToMany
    @JoinTable(
            name = "class_student",
            joinColumns = @JoinColumn(name = "class_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<User> students = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Subject subject;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "manager_id", nullable = false)
    private User manager;

    @Column(name = "detail")
    private String detail;
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "status", nullable = false)
    private ClassStatuses status;
    @Column(name = "semester")
    private String semester;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp createdAt;
    @Column(name = "updated_by")
    private Integer adminId;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp updatedAt;
}
