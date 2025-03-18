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
@Table(name = "notification")
public class Notification {

    @Id
    private String id;  // Manually assigned ID

    @ManyToOne
    @JoinColumn(name = "request_id", nullable = false)
    private BloodRequest request;

    @ManyToOne
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor;

    private String message;
    private String status;
    private LocalDateTime createdAt;

    @PrePersist
    public void generateId() {
        String currentYear = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy"));
        String formattedCounter = String.format("NC%04d", getNextCounter()); // Generate NC0001, NC0002, etc.
        this.id = "LL00" + currentYear + formattedCounter;
    }

    private int getNextCounter() {
        return (int) (Math.random() * 10000); // Example logic, replace with actual counter
    }
}