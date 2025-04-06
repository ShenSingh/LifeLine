package com.zenveus.backend.dto;

import com.zenveus.backend.entity.Hospital;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.util.BloodType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class DonorDTO {
    private String id;
    private int age;
    private String gender;
    private BloodType bloodType;
    private int numberOfTimesDonated;
    private LocalDateTime lastDonationDate;
    private String willingToDonateFrequency;
    private boolean longTermIllness;
    private String illnessDescription;
    private boolean takingMedicine;
    private String medicineDescription;
    private boolean undergoneSurgery;
    private String surgeryDescription;
    private User user;
}
