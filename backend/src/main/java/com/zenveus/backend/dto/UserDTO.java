package com.zenveus.backend.dto;

import com.zenveus.backend.entity.Hospital;
import com.zenveus.backend.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private  String password;
    private String phone;
    private String address;
    private Hospital hospital;
    private Role role; // REQUESTER or DONOR
}
