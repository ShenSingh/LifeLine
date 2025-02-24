package com.zenveus.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "request_id", nullable = false)
    private BloodRequest request;

    @ManyToOne
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor;

    private String message;
    private String status;
    private LocalDateTime createdAt;
}