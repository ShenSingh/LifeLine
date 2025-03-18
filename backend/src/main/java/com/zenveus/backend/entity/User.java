package com.zenveus.backend.entity;

import com.zenveus.backend.util.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "user")
public class User {

    @Id
    private String id;  // Manually assigned ID

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // REQUESTER or DONOR

    @OneToMany(mappedBy = "requester")
    private List<BloodRequest> bloodRequests;

    @OneToMany(mappedBy = "donor")
    private List<DonationAppointment> donationAppointments;

    @PrePersist
    public void generateId() {
        String currentYear = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy"));
        String formattedCounter = String.format("UR%04d", getNextCounter()); // Generate UR0001, UR0002, etc.
        this.id = "LL00" + currentYear + formattedCounter;
    }

    private int getNextCounter() {
        return (int) (Math.random() * 10000); // Example logic, replace with actual counter
    }
}