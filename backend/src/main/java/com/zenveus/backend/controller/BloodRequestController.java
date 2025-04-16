package com.zenveus.backend.controller;

import com.zenveus.backend.dto.BloodRequestDTO;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.service.BloodRequestService;
import com.zenveus.backend.service.UserService;
import com.zenveus.backend.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("api/v1/bloodRequest")
public class BloodRequestController {

    @Autowired
    private BloodRequestService bloodRequestService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping(value = "/create")
    public ResponseEntity<?> createBloodRequest(@RequestHeader("Authorization") String token, @RequestBody BloodRequestDTO bloodRequestDTO) {
        try {
            String tokens = token.replace("Bearer ", "");
            Claims claims = jwtUtil.getAllClaimsFromToken(tokens);
            String email = claims.getSubject();
            System.out.println("Email from token: " + email);
            User user = userService.getUserByEmail(email);
            System.out.println("User from token: " + user);
            if (user == null) {
                return ResponseEntity.status(401).body("Unauthorized: User not found");
            }

            // setValues the request data
            bloodRequestDTO.setStatus("Pending");
            bloodRequestDTO.setCreatedAt(String.valueOf(System.currentTimeMillis()));
            bloodRequestDTO.setRequester(user);

            BloodRequestDTO createdRequest = bloodRequestService.createBloodRequest(bloodRequestDTO);
            return ResponseEntity.ok(createdRequest);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating blood request: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBloodRequest(@PathVariable String id, @RequestBody BloodRequestDTO bloodRequestDTO) {
        try {
            BloodRequestDTO updatedRequest = bloodRequestService.updateBloodRequest(id, bloodRequestDTO);
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating blood request: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteBloodRequest(@PathVariable String id) {
        try {
            bloodRequestService.deleteBloodRequest(id);
            return ResponseEntity.ok("Blood request deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting blood request: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllBloodRequests() {
        try {
            List<BloodRequestDTO> requests = bloodRequestService.getAllBloodRequests();
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving blood requests: " + e.getMessage());
        }
    }
}