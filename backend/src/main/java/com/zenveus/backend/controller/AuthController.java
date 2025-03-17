package com.zenveus.backend.controller;

import com.zenveus.backend.dto.AuthDTO;
import com.zenveus.backend.dto.ResponseDTO;
import com.zenveus.backend.dto.UserDTO;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.service.AuthService;
import com.zenveus.backend.service.UserService;
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

    @Autowired
    public AuthController(AuthService authService, JwtUtil jwtUtil) {

        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO user) {
        try {
            // Authenticate the user
            UserDTO userDTO = authService.loginUser(user.getEmail(), user.getPassword());

            if (userDTO != null) {
                // Generate JWT token
                String token = JwtUtil.generateToken(userDTO);

                // Create AuthDTO to return
                AuthDTO authDTO = new AuthDTO();
                authDTO.setEmail(userDTO.getEmail());
                authDTO.setToken(token);

                // Create response
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

    // Registration endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {

        try {

            if (userDTO.getEmail().endsWith("@lifeline.com")) {
                userDTO.setRole(Role.ADMIN);
            }else {
                userDTO.setRole(Role.REQUESTER);
            }

            int isOk = authService.registerUser(userDTO);

            System.out.println("========================code=="+isOk);

            if (isOk == 201) {

                System.out.println("aya awa 1");

                AuthDTO authDTO = new AuthDTO();
                authDTO.setEmail(userDTO.getEmail());
                System.out.println("aya awa 2"+authDTO.getEmail());

                authDTO.setToken(JwtUtil.generateToken(userDTO));

                System.out.println("User Registered Successfully");
                System.out.println("Email: " + userDTO.getEmail());
                System.out.println("Role: " + userDTO.getRole());
                System.out.println("Token: " + authDTO.getToken());

                ResponseDTO responseDTO = new ResponseDTO();
                responseDTO.setCode(VarList.Created);
                responseDTO.setMessage("Success");
                responseDTO.setData(authDTO);

                System.out.println("================================"+responseDTO);

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
