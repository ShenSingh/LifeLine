package com.zenveus.backend.dto;

import com.zenveus.backend.entity.User;
import com.zenveus.backend.util.BloodType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DonorDTO {
    private String id;
    private int age;
    private String gender;
    private BloodType bloodType;
    private int numberOfTimesDonated;
    private String lastDonationDate;
    private String willingToDonateFrequency;
    private boolean longTermIllness;
    private boolean takingMedicine;
    private boolean undergoneSurgery;
    private User user;
}
