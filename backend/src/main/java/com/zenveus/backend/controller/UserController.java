package com.zenveus.backend.controller;

import com.zenveus.backend.dto.UserDTO;
import com.zenveus.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("api/user")
public class UserController {


    @Autowired
    private UserService userService;

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return null;

    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        return null;
    }
}
