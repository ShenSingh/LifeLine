package com.zenveus.backend.controller;

import com.zenveus.backend.dto.BloodRequestDTO;
import com.zenveus.backend.service.BloodRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("api/v1/bloodRequest")
public class BloodRequestController {

    @Autowired
    private BloodRequestService bloodRequestService;

    @PostMapping
    public ResponseEntity<?> createBloodRequest(@RequestBody BloodRequestDTO bloodRequestDTO) {
        try {
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