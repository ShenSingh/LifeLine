package com.zenveus.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "blood_request")
public class BloodRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    private String bloodType;
    private String location;
    private String status;
    private LocalDateTime createdAt;
}