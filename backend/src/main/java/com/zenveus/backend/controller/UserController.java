package com.zenveus.backend.controller;

import com.zenveus.backend.dto.ResponseDTO;
import com.zenveus.backend.dto.UserDTO;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.service.UserService;
import com.zenveus.backend.util.JwtUtil;
import com.zenveus.backend.util.VarList;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        UserDTO userDTO = userService.getUserById(id);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser( @PathVariable String id, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable String id, HttpServletRequest request) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping(value = "/me")
    public ResponseEntity<?> getMe(@RequestHeader("Authorization") String authHeader) {
        try {
            // Remove the "Bearer " prefix from the token
            String token = authHeader.replace("Bearer ", "");
            System.out.println("Parsed Token: " + token);

            Claims claims = jwtUtil.getAllClaimsFromToken(token);
            String email = claims.getSubject();
            System.out.println("Email: " + email);

            User userDTO = userService.getUserByEmail(email);
            return ResponseEntity.ok(userDTO);
        } catch (io.jsonwebtoken.io.DecodingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO(VarList.Bad_Request, "Invalid token format", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

}
