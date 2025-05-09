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
    private UserDTO requester;
    private BloodType bloodType;
    private HospitalDTO hospital;
    private String status;
    private String createdAt;

}
