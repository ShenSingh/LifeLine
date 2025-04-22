package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.DonationAppointmentDTO;
import com.zenveus.backend.entity.DonationAppointment;
import com.zenveus.backend.repository.DonationAppointmentRepository;
import com.zenveus.backend.service.DonationAppointmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonationAppointmentServiceImpl implements DonationAppointmentService {

    @Autowired
    private DonationAppointmentRepository appointmentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public DonationAppointmentDTO createAppointment(DonationAppointmentDTO appointmentDTO) {
        DonationAppointment appointment = modelMapper.map(appointmentDTO, DonationAppointment.class);
        appointment = appointmentRepository.save(appointment);
        return modelMapper.map(appointment, DonationAppointmentDTO.class);
    }

    @Override
    public DonationAppointmentDTO getAppointmentById(String id) {
        DonationAppointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));
        return modelMapper.map(appointment, DonationAppointmentDTO.class);
    }

    @Override
    public List<DonationAppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(appointment -> modelMapper.map(appointment, DonationAppointmentDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public DonationAppointmentDTO updateAppointment(String id, DonationAppointmentDTO appointmentDTO) {
        DonationAppointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));
        modelMapper.map(appointmentDTO, appointment);
        appointment = appointmentRepository.save(appointment);
        return modelMapper.map(appointment, DonationAppointmentDTO.class);
    }

    @Override
    public void deleteAppointment(String id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    public List<DonationAppointmentDTO> getDonationAppointmentsByUserId(String userId) {
        List<DonationAppointment> appointments =
                appointmentRepository.findByDonorId(userId);

        return appointments.stream()
                .map(appointment -> modelMapper.map(appointment, DonationAppointmentDTO.class))
                .collect(Collectors.toList());
    }
}
