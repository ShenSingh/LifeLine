package com.zenveus.backend.dto;

import com.zenveus.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdminDTO {
    private String id;
    private User user;
    private String role;
    private String permissions;
}
