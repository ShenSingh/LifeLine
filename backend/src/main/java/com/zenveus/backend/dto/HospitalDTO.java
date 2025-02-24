package com.zenveus.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class HospitalDTO {
    private Long id;
    private String name;
    private String location;
    private String contactInfo;
}
