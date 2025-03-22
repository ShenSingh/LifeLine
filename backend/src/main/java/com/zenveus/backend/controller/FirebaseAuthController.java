package com.zenveus.backend.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.zenveus.backend.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/fAuth")
public class FirebaseAuthController {

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Handle user registration logic (can be used for custom fields, etc.)
        return ResponseEntity.ok("User Registered");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Token: " + loginRequest.getIdToken());
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(loginRequest.getIdToken());
            return ResponseEntity.ok("User logged in successfully");
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testFirebaseAuth(@RequestHeader("Authorization") String idToken) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            return ResponseEntity.ok("Token is valid. User ID: " + decodedToken.getUid());
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }

    @GetMapping("/ping")
    public ResponseEntity<Map<String, String>> ping() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Server is running");
        return ResponseEntity.ok(response);
    }
}

