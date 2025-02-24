package com.zenveus.backend.dto;

import com.zenveus.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReportDTO {
    private Long id;
    private User reportedBy;
    private User reportedUser;
    private String reason;
    private String status;
    private LocalDateTime createdAt;
}
