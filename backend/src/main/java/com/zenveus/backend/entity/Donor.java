package com.zenveus.backend.entity;

import com.zenveus.backend.util.BloodType;
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
    private int age;
    private String gender;

    @Enumerated(EnumType.STRING)
    private BloodType bloodType;

    private int numberOfTimesDonated;
    private String lastDonationDate;
    private String willingToDonateFrequency; // 4 months, 6 months, 1 year
    private boolean longTermIllness;
    private boolean takingMedicine;
    private boolean undergoneSurgery;
}
