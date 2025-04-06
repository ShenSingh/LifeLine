package com.zenveus.backend.service;

import com.zenveus.backend.dto.DonationAppointmentDTO;

import java.util.List;

public interface DonationAppointmentService {
    DonationAppointmentDTO createAppointment(DonationAppointmentDTO appointmentDTO);
    DonationAppointmentDTO getAppointmentById(String id);
    List<DonationAppointmentDTO> getAllAppointments();
    DonationAppointmentDTO updateAppointment(String id, DonationAppointmentDTO appointmentDTO);
    void deleteAppointment(String id);
}
