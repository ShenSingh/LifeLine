package com.zenveus.backend.dto;

import com.zenveus.backend.entity.BloodRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class MessageDTO {
    private String id;
    private BloodRequest bloodRequest;
    private LocalDateTime timestamp;
}

