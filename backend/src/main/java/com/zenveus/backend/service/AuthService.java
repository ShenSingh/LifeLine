package com.zenveus.backend.service;

import com.zenveus.backend.dto.UserDTO;


public interface AuthService {
    int registerUser(UserDTO userDTO);
    UserDTO searchUser(String username);
    UserDTO loginUser(String email, String password);

}
