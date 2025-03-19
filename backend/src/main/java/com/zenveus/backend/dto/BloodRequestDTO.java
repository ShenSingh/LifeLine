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
public class BloodRequestDTO {
    private String id;
    private User requester;
    private BloodType bloodType;
    private Hospital hospital;
    private String status;
    private String createdAt;
}