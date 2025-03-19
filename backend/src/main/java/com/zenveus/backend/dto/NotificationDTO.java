package com.zenveus.backend.dto;

import com.zenveus.backend.entity.BloodRequest;
import com.zenveus.backend.entity.Donor;
import com.zenveus.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class NotificationDTO {
    private String id;
    private Donor donor;
    private BloodRequest request;
    private String status;
    private LocalDateTime createdAt;
}
