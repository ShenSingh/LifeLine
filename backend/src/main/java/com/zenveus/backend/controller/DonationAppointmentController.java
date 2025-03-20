package com.zenveus.backend.controller;

import com.zenveus.backend.dto.DonationAppointmentDTO;
import com.zenveus.backend.service.DonationAppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("api/donationAppointments")
public class DonationAppointmentController {

    @Autowired
    private DonationAppointmentService donationAppointmentService;

    @PostMapping
    public ResponseEntity<DonationAppointmentDTO> createAppointment(@RequestBody DonationAppointmentDTO appointmentDTO) {
        DonationAppointmentDTO createdAppointment = donationAppointmentService.createAppointment(appointmentDTO);
        return ResponseEntity.ok(createdAppointment);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonationAppointmentDTO> getAppointmentById(@PathVariable String id) {
        DonationAppointmentDTO appointmentDTO = donationAppointmentService.getAppointmentById(id);
        return ResponseEntity.ok(appointmentDTO);
    }

    @GetMapping
    public ResponseEntity<List<DonationAppointmentDTO>> getAllAppointments() {
        List<DonationAppointmentDTO> appointments = donationAppointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonationAppointmentDTO> updateAppointment(@PathVariable String id, @RequestBody DonationAppointmentDTO appointmentDTO) {
        DonationAppointmentDTO updatedAppointment = donationAppointmentService.updateAppointment(id, appointmentDTO);
        return ResponseEntity.ok(updatedAppointment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable String id) {
        donationAppointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }
}