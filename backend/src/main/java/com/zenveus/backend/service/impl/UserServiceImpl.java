package com.zenveus.backend.service.impl;

import com.zenveus.backend.entity.User;
import com.zenveus.backend.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserServiceImpl implements UserService , UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Your logic to fetch the user from the database
        return new org.springframework.security.core.userdetails.User(
                "test@example.com", // Replace with actual user details
                "password", // Replace with encoded password
                new ArrayList<>()
        );
    }
}
