package com.zenveus.backend.controller;

import com.zenveus.backend.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("api/hospital")
public class HospitalController {


    private final HospitalService hospitalService;

    @Autowired
    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    @GetMapping("/fetch")
    public String fetchHospitals() {
        hospitalService.fetchAndSaveHospitals();
        return "Hospital data fetched and stored successfully!";
    }
}
