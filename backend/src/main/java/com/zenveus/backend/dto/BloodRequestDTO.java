package com.zenveus.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class BloodRequestDTO {
    private String id;
    private String requesterId;
    private String bloodType;
    private String location;
    private String status;
    private String createdAt;
}