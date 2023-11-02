package com.group1.studentprojectportal.entity;

import com.group1.studentprojectportal.constant.SystemSettings;
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
@Table(name = "system_setting", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"setting_group", "name"})
})
public class SystemSetting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @Enumerated(EnumType.STRING)
    @Column(name = "setting_group", nullable = false)
    private SystemSettings settingGroup;

    @Column(name = "name", nullable = false, length = 20)
    private String name;
    @Column(name = "display_order", nullable = false,
            columnDefinition = "tinyint")
    private Integer displayOrder;
    @Column(name = "is_enable", nullable = false,
            columnDefinition = "boolean default true")
    private Boolean isEnable;
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
