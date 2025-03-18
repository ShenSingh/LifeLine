package com.zenveus.backend.service.impl;

import com.zenveus.backend.entity.Admin;
import com.zenveus.backend.repository.AdminRepository;
import com.zenveus.backend.service.AdminService;
import com.zenveus.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements UserDetailsService, AdminService {


    @Autowired
    private AdminRepository adminRepository;

    @Override
    public void createAdmin(Admin admin) {
        adminRepository.save(admin);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
