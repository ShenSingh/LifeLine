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
@Table(name = "message")
public class Message {

    @Id
    private String id;  // Use String for custom ID format

    private String message;
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    private User receiver;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @PrePersist
    public void generateId() {
        String currentYear = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy"));
        String formattedCounter = String.format("MS%04d", getNextCounter()); // Generate MS0001, MS0002, etc.
        this.id = "LL00" + currentYear + formattedCounter;
    }

    // Method to generate the next counter (you can modify this logic to fetch from a database or static counter)
    private int getNextCounter() {
        // This can be replaced with a more advanced counter generation logic
        // For example, using a database sequence or other means to ensure uniqueness
        return (int) (Math.random() * 10000); // Example
    }
}