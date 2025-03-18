package com.zenveus.backend.service;

import com.zenveus.backend.dto.UserDTO;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


public interface AuthService {
    int registerUser(UserDTO userDTO);
    UserDTO searchUser(String username);
    UserDTO loginUser(String email, String password);

    User convertToEntity(UserDTO userDTO);
}
