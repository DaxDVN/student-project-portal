package com.group1.studentprojectportal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private ClassEntity projectClass;

    @ManyToMany(mappedBy = "projects")
    private Set<User> members = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "mentor_id", nullable = false)
    private User mentor;

    @ManyToOne
    @JoinColumn(name = "leader_id", nullable = true)
    private User leader;

    @Column(name = "is_active", nullable = false,
            columnDefinition = "boolean default false")
    private Boolean isActive;
    @Column(name = "project_name", nullable = false)
    private String projectName;
    @Column(name = "group_name", nullable = false)
    private String groupName;
    @Column(name = "title", nullable = false, length = 100)
    private String title;
    @Column(name = "description")
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp created_at;
    @Column(name = "updated_by")
    @LastModifiedBy
    private String updatedBy;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp updated_at;
    @Column(name = "created_by")
    @CreatedBy
    private String createdBy;
}
