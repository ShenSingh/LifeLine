package com.zenveus.backend.service;

import com.zenveus.backend.dto.UserDTO;
import com.zenveus.backend.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    UserDetails loadUserByUsername(String email);

    UserDTO getUserById(String id);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(String id, UserDTO userDTO);
    void deleteUser(String id);
    UserDTO searchUser(String username);

    User getUserByEmail(String email);

}
