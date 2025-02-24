package com.zenveus.backend.dto;

import com.zenveus.backend.entity.BloodRequest;
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
    private BloodRequest request;
    private User donor;
    private String message;
    private String status;
    private LocalDateTime createdAt;
}
