package com.zenveus.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;
    private String email;
    private String phone;
    private String location;
    private String bloodType;
    private String role; // REQUESTER or DONOR

    @OneToMany(mappedBy = "requester")
    private List<BloodRequest> bloodRequests;

    @OneToMany(mappedBy = "donor")
    private List<DonationAppointment> donationAppointments;
}