package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.UserDTO;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.repository.UserRepository;
import com.zenveus.backend.service.AuthService;
import com.zenveus.backend.service.UserService;
import com.zenveus.backend.util.Role;
import com.zenveus.backend.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements UserDetailsService, AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public int registerUser(UserDTO userDTO) {

        if (!userRepository.existsByEmail(userDTO.getEmail())) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            userRepository.save(modelMapper.map(userDTO, User.class));
            return VarList.Created;
        }else {
            return VarList.Not_Acceptable;
        }
    }



    @Override
    public UserDTO searchUser(String username) {
        return null;
    }

    @Override
    public UserDTO loginUser(String email, String password) {

        try{
            User user = userRepository.findByEmail(email);
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return modelMapper.map(user, UserDTO.class);
            } else {
                return null;
            }
        }catch (UsernameNotFoundException e){
            return null;
        }
    }

    @Override
    public User convertToEntity(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        user.setRole(userDTO.getRole() != null ? userDTO.getRole() : Role.REQUESTER);
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
