package com.zenveus.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class DonorDTO {
    private Long id;
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
    private String willingToDonateFrequency;
    private boolean longTermIllness;
    private String illnessDescription;
    private boolean takingMedicine;
    private String medicineDescription;
    private boolean undergoneSurgery;
    private String surgeryDescription;
}
