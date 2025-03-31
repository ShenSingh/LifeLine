package com.zenveus.backend.controller;

import com.zenveus.backend.dto.AuthDTO;
import com.zenveus.backend.dto.ResponseDTO;
import com.zenveus.backend.dto.UserDTO;
import com.zenveus.backend.entity.Admin;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.service.AdminService;
import com.zenveus.backend.service.AuthService;
import com.zenveus.backend.util.JwtUtil;
import com.zenveus.backend.util.Role;
import com.zenveus.backend.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final AdminService adminService;

    @Autowired
    public AuthController(AuthService authService, JwtUtil jwtUtil, AdminService adminService) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO user) {
        try {
            UserDTO userDTO = authService.loginUser(user.getEmail(), user.getPassword());
            if (userDTO != null) {
                String token = JwtUtil.generateToken(userDTO);
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
                authDTO.setToken(JwtUtil.generateToken(userDTO));

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
}