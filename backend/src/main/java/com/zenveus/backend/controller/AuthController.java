package com.zenveus.backend.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.zenveus.backend.dto.AuthDTO;
import com.zenveus.backend.dto.ResponseDTO;
import com.zenveus.backend.dto.UserDTO;
import com.zenveus.backend.entity.Admin;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.service.AdminService;
import com.zenveus.backend.service.AuthService;
import com.zenveus.backend.service.UserService;
import com.zenveus.backend.util.JwtUtil;
import com.zenveus.backend.util.Role;
import com.zenveus.backend.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private final AdminService adminService;

    @Autowired
    private final AuthService authService;

    @Autowired
    private final JwtUtil jwtUtil;

    @Autowired
    private UserService userService;


    @Autowired
    public AuthController(AuthService authService, JwtUtil jwtUtil, AdminService adminService) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO user) {
        try {
            System.out.println("Login request received: " + user.getEmail() + ", " + user.getPassword()+ ", " + user.getRole());
            UserDTO userDTO = authService.loginUser(user.getEmail(), user.getPassword());
            if (userDTO != null) {

                String token = new JwtUtil().generateToken(userDTO);
                AuthDTO authDTO = new AuthDTO();
                authDTO.setEmail(userDTO.getEmail());
                authDTO.setToken(token);
                ResponseDTO responseDTO = new ResponseDTO();
                responseDTO.setCode(VarList.OK);
                responseDTO.setMessage("Login successful");
                responseDTO.setData(authDTO);
                return ResponseEntity.ok(responseDTO);

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ResponseDTO(VarList.Unauthorized, "Invalid credentials", null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        try {
            if (userDTO.getEmail().endsWith("@lifeline.com")) {
                userDTO.setRole(Role.ADMIN);
            } else {
                userDTO.setRole(Role.REQUESTER);
            }

            int isOk = authService.registerUser(userDTO);

            System.out.println("user reg code ++++++"+isOk);
            if (isOk == 201) {

                AuthDTO authDTO = new AuthDTO();
                authDTO.setEmail(userDTO.getEmail());
                authDTO.setToken(jwtUtil.generateToken(userDTO));

                ResponseDTO responseDTO = new ResponseDTO();
                responseDTO.setCode(VarList.Created);
                responseDTO.setMessage("Success");
                responseDTO.setData(authDTO);

                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new ResponseDTO(VarList.Created, "Success", authDTO));
            } else if (isOk == VarList.Not_Acceptable) {
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                        .body(new ResponseDTO(VarList.Not_Acceptable, "Email Already Used", null));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                        .body(new ResponseDTO(VarList.Bad_Gateway, "Error", null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }


    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) throws GeneralSecurityException, IOException {
        String accessToken = request.get("token");
        String email = request.get("email");
        String name = request.get("name");

        String[] nameParts = name.split(" ");
        String firstName = nameParts[0];
        String lastName = nameParts.length > 1 ? nameParts[1] : "";

        System.out.println("Google login request received: " + email + ", " + name);

        // Check if the user exists in the database
        User existingUser = userService.getUserByEmail(email);

        Role role = email.endsWith("@lifeline.com") ? Role.ADMIN : Role.REQUESTER;

        // If user doesn't exist, create a new user
        if (existingUser == null) {
            UserDTO newUserDTO = new UserDTO();
            newUserDTO.setEmail(email);
            newUserDTO.setFirstName(firstName);
            newUserDTO.setLastName(lastName);
            newUserDTO.setRole(role);
            // Set a random password or use a special flag for OAuth users
            newUserDTO.setPassword(generateRandomPassword());
            // Save the new user
            try {
                authService.registerUser(newUserDTO);
                System.out.println("New Google user registered: " + email);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new ResponseDTO(VarList.Internal_Server_Error, "Failed to register Google user", null));
            }
        }

        // Create UserDTO for token generation
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(email);
        userDTO.setFirstName(firstName);
        userDTO.setLastName(lastName);
        userDTO.setRole(role);

        // Generate JWT
        String jwt = jwtUtil.generateToken(userDTO);

        // Create auth response with token
        AuthDTO authDTO = new AuthDTO();
        authDTO.setEmail(email);
        authDTO.setToken(jwt);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setCode(VarList.OK);
        responseDTO.setMessage("Login successful");
        responseDTO.setData(authDTO);
        return ResponseEntity.ok(responseDTO);
    }

    private String generateRandomPassword() {
        // Generate a secure random password
        return java.util.UUID.randomUUID().toString();
    }


}