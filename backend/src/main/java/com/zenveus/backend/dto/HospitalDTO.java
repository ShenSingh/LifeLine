package com.zenveus.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class    HospitalDTO {
    private String id;
    private String name;
    private String latitude;
    private String longitude;
    private String district;
}
