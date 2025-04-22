package com.zenveus.backend.controller;

import com.zenveus.backend.dto.DonationAppointmentDTO;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.service.DonationAppointmentService;
import com.zenveus.backend.service.UserService;
import com.zenveus.backend.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("api/donationAppointments")
public class DonationAppointmentController {

    @Autowired
    private DonationAppointmentService donationAppointmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DonationAppointmentDTO> updateAppointment(@PathVariable String id, @RequestBody DonationAppointmentDTO appointmentDTO) {
        DonationAppointmentDTO updatedAppointment = donationAppointmentService.updateAppointment(id, appointmentDTO);
        return ResponseEntity.ok(updatedAppointment);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteAppointment(@PathVariable String id) {
        donationAppointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserDonationAppointments(@RequestHeader("Authorization") String token) {
        try {
            String tokens = token.replace("Bearer ", "");
            Claims claims = jwtUtil.getAllClaimsFromToken(tokens);
            String email = claims.getSubject();

            User user = userService.getUserByEmail(email);
            if (user == null) {
                return ResponseEntity.status(401).body("Unauthorized: User not found");
            }

            List<DonationAppointmentDTO> appointments =
                    donationAppointmentService.getDonationAppointmentsByUserId(user.getId());
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Error retrieving donation appointments: " + e.getMessage());
        }
    }
}
