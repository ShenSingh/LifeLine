package com.zenveus.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

@Table(name = "blood_request")
public class BloodRequest {

    @Id
    private String id;  // Use String for the custom ID format

    @ManyToOne
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    private String bloodType;

    @ManyToOne
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    private String status;
    private String createdAt;

    @PrePersist
    public void generateId() {
        String currentYear = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy"));
        String formattedCounter = String.format("BR%04d", getNextCounter()); // Generate, etc.
        this.id = "LL00" + currentYear + formattedCounter;
    }

    private int getNextCounter() {
        return (int) (Math.random() * 10000); // Example logic, replace with actual counter
    }
}
