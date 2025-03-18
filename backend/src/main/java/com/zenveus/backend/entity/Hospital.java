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
@Table(name = "hospital")
public class Hospital {

    @Id
    private String id;  // Use String for custom ID format

    private String contactInfo;
    private String location;
    private String name;

    @PrePersist
    public void generateId() {
        String currentYear = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy"));
        String formattedCounter = String.format("HP%04d", getNextCounter()); // Generate HP0001, HP0002, etc.
        this.id = "LL00" + currentYear + formattedCounter;
    }

    private int getNextCounter() {
        return (int) (Math.random() * 10000); // Example logic, replace with actual counter
    }
}