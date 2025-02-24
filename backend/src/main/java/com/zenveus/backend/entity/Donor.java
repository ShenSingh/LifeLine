package com.zenveus.backend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "donor")
public class Donor {
    @Id
    private String id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    private String name;
    private int age;
    private String gender;
    private String phone;
    private String email;
    private String bloodType;
    private String city;
    private String province;
    private int numberOfTimesDonated;
    private LocalDateTime lastDonationDate;
    private String willingToDonateFrequency; // 4 months, 6 months, 1 year
    private boolean longTermIllness;
    private String illnessDescription;
    private boolean takingMedicine;
    private String medicineDescription;
    private boolean undergoneSurgery;
    private String surgeryDescription;
}