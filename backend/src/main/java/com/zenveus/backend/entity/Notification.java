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
    @JoinColumn(name = "donor_id", nullable = false)
    private Donor donor;

    @ManyToOne
    @JoinColumn(name = "message_id")
    private Message message;

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

// n11, d1, {m1} , pending , 2025-01-01 00:00:00
// n12, d2, {m1} , asserted , 2025-01-01 00:00:00
// n13, d3, {m1} , pending , 2025-01-01 00:00:00
// n14, d4, {m1} , pending , 2025-01-01 00:00:00
// n15, d5, {m1} , pending , 2025-01-01 00:00:00
