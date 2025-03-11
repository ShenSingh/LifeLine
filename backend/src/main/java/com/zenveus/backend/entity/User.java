package com.zenveus.backend.entity;

import com.zenveus.backend.util.Role;
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
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String Address;
    private String city;
    private String username;
    private String password;
    private Role role; // REQUESTER or DONOR

    @OneToMany(mappedBy = "requester")
    private List<BloodRequest> bloodRequests;

    @OneToMany(mappedBy = "donor")
    private List<DonationAppointment> donationAppointments;
}