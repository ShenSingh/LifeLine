package com.zenveus.backend.service;

import com.zenveus.backend.dto.AdminDTO;

import java.util.List;

public interface AdminService {
    AdminDTO createAdmin(AdminDTO adminDTO);
    AdminDTO getAdminById(String id);
    List<AdminDTO> getAllAdmins();
    AdminDTO updateAdmin(String id, AdminDTO adminDTO);
    void deleteAdmin(String id);
}
