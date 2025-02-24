package com.zenveus.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class BloodRequestDTO {
    private Long id;
    private Long requesterId;
    private String bloodType;
    private String location;
    private String status;
    private LocalDateTime createdAt;
}