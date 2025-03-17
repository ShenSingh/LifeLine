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
@Table(name = "report")
public class Report {

    @Id
    private String id;  // Manually assigned ID

    @ManyToOne
    @JoinColumn(name = "reported_by", nullable = false)
    private User reportedBy;

    @ManyToOne
    @JoinColumn(name = "reported_user", nullable = false)
    private User reportedUser;

    private String reason;
    private String status;
    private LocalDateTime createdAt;

    // This method is called before persisting the entity to generate the ID
    @PrePersist
    public void generateId() {
        String currentYear = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy"));
        String formattedCounter = String.format("RP%04d", getNextCounter()); // Generate RP0001, RP0002, etc.
        this.id = "LL00" + currentYear + formattedCounter;
    }

    // Method to generate the next counter (you can modify this logic to fetch from a database or static counter)
    private int getNextCounter() {
        // This can be replaced with a more advanced counter generation logic
        // For example, using a database sequence or other means to ensure uniqueness
        return (int) (Math.random() * 10000); // Example logic, replace with actual counter // LL00RL0001
    }
}
