package com.zenveus.backend.service;

import com.zenveus.backend.entity.User;
import com.zenveus.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;


public interface UserService {

    UserDetails loadUserByUsername(String email);
}
