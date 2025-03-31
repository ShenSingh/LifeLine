package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.UserDTO;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.repository.UserRepository;
import com.zenveus.backend.service.AuthService;
import com.zenveus.backend.util.Role;
import com.zenveus.backend.util.VarList;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@Transactional
public class AuthServiceImpl implements UserDetailsService, AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @PersistenceContext
    private EntityManager entityManager;

    private static int counter = 0;


    @Transactional
    public String generateId(User user) {
        String currentYear = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yy"));
        String formattedCounter = String.format("UR%04d", getNextCounter());
        String generatedId = "LL00" + currentYear + formattedCounter;
        user.setId(generatedId);
        return generatedId;
    }

    private int getNextCounter() {
        if (counter == 0) {
            String query = "SELECT MAX(CAST(SUBSTRING(id, 7) AS int)) FROM User";
            Integer maxId = (Integer) entityManager.createQuery(query).getSingleResult();
            counter = (maxId != null) ? maxId : 0;
        }
        return ++counter;
    }

    @Override
    public int registerUser(UserDTO userDTO) {

        if (!userRepository.existsByEmail(userDTO.getEmail())) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            User user = modelMapper.map(userDTO, User.class);
            user.setId(generateId(user));
            userRepository.save(user);
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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
