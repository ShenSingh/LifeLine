package com.zenveus.backend.controller;

import com.zenveus.backend.dto.BloodRequestDTO;
import com.zenveus.backend.dto.UserDTO;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.service.BloodRequestService;
import com.zenveus.backend.service.UserService;
import com.zenveus.backend.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.OutputStream;
import java.util.Date;
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

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping(value = "/create")
    public ResponseEntity<?> createBloodRequest(@RequestHeader("Authorization") String token, @RequestBody BloodRequestDTO bloodRequestDTO) {
        System.out.println("Received Data : " + bloodRequestDTO);
        try {
            String tokens = token.replace("Bearer ", "");
            Claims claims = jwtUtil.getAllClaimsFromToken(tokens);
            String email = claims.getSubject();

            User user = userService.getUserByEmail(email);

            if (user == null) {
                return ResponseEntity.status(401).body("Unauthorized: User not found");
            }

            // setValues the request data
            bloodRequestDTO.setStatus("Pending");
            bloodRequestDTO.setBloodType(bloodRequestDTO.getBloodType());

            Date currentDate = new Date();

            bloodRequestDTO.setCreatedAt(String.valueOf(currentDate));

            System.out.println("==========================================");
            System.out.println("createAt: " + bloodRequestDTO.getCreatedAt());
            System.out.println("==========================================");

            UserDTO userDTO = modelMapper.map(user, UserDTO.class);

            bloodRequestDTO.setRequester(userDTO);

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

    @GetMapping(value = "/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllBloodRequests(OutputStream outputStream) {
        try {
            List<BloodRequestDTO> requests = bloodRequestService.getAllBloodRequests();
            requests.forEach(request -> System.out.println("Blood request: " + request));
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving blood requests: " + e.getMessage());
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserBloodRequests(@RequestHeader("Authorization") String token) {
        try {
            String tokens = token.replace("Bearer ", "");
            Claims claims = jwtUtil.getAllClaimsFromToken(tokens);
            String email = claims.getSubject();

            User user = userService.getUserByEmail(email);
            if (user == null) {
                return ResponseEntity.status(401).body("Unauthorized: User not found");
            }

            List<BloodRequestDTO> requests = bloodRequestService.getBloodRequestsByUserId(user.getId());
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving blood requests: " + e.getMessage());
        }
    }
}
