package com.zenveus.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class DonationAppointmentDTO {
    private String id;
    private String donorId;
    private String requesterId;
    private String hospitalId;
    private LocalDateTime appointmentDate;
    private String status;
}
