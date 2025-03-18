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
@Table(name = "donation_appointment")
public class DonationAppointment {

    @Id
    private String id;  // Use String for custom ID format

    @ManyToOne
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor;

    @ManyToOne
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    private LocalDateTime appointmentDate;
    private String status;

    @PrePersist
    public void generateId() {
        String currentYear = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy"));
        String formattedCounter = String.format("DA%04d", getNextCounter()); // Generate DA0001, DA0002, etc.
        this.id = "LL00" + currentYear + formattedCounter;
    }

    private int getNextCounter() {
        return (int) (Math.random() * 10000); // Example logic
    }
}