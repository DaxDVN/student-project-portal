package com.group1.studentprojectportal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assignment")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "title", nullable = false, length = 100)
    private String title;
    @Column(name = "description")
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp created_at;
    @Column(name = "updated_by")
    private Integer adminId;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Timestamp updated_at;


}