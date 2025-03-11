package com.zenveus.backend.service;

import com.zenveus.backend.dto.UserDTO;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Get All Users
    public List<UserDTO> getAllUsers(){
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
    }



    // Add User
    public UserDTO addUser(UserDTO userDTO){
        User user = modelMapper.map(userDTO, User.class);
        userRepository.save(user);
        return userDTO;
    }
}
