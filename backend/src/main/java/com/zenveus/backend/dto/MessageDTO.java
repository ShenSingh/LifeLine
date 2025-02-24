package com.zenveus.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class MessageDTO {
    private String id;
    private String senderId;
    private String receiverId;
    private String message;
    private LocalDateTime timestamp;
}

