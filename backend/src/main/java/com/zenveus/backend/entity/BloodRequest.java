package com.zenveus.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "blood_request")
public class BloodRequest {

    @Id
    private String id;  // Use String for the custom ID format

    @ManyToOne
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    private String bloodType;
    private String location;
    private String status;
    private LocalDateTime createdAt;

    private static int counter = 1;  // Static counter for generating V001, V002, etc.

    @PrePersist
    public void generateId() {
        String currentYear = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy"));
        String formattedCounter = String.format("BR%04d", counter++);  // Generates V0001, V0002, etc.
        this.id = "LL00" + currentYear + formattedCounter;  // Generates LL002025BR001 format
    }
}