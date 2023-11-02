package com.group1.studentprojectportal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "milestone")
public class Milestone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "from_date")
    private LocalDate fromDate;
    @Column(name = "to_date")
    private LocalDate toDate;

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
