package com.zenveus.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class DonationAppointmentDTO {
    private Long id;
    private Long donorId;
    private Long requesterId;
    private Long hospitalId;
    private LocalDateTime appointmentDate;
    private String status;
}
