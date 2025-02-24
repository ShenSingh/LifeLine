package com.zenveus.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "report")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reported_by", nullable = false)
    private User reportedBy;

    @ManyToOne
    @JoinColumn(name = "reported_user", nullable = false)
    private User reportedUser;

    private String reason;
    private String status;
    private LocalDateTime createdAt;
}
