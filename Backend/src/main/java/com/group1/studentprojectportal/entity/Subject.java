package com.group1.studentprojectportal.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "subject")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "code", nullable = false, unique = true, length = 6)
    private String code;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "manager_id", nullable = false)
    private User manager;
    @Column(name = "name", nullable = false, length = 50)
    private String name;
    @Column(name = "is_enable", nullable = false,
            columnDefinition = "boolean default true")
    private Boolean isEnable;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp createdAt;
    private Integer updatedBy;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp updatedAt;
    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    private List<ClassEntity> classes = new ArrayList<>();
}
