package com.zenveus.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("api/hospital")
public class HospitalController {
    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

    @GetMapping("/search")
    public ResponseEntity<String> getHospital(@RequestParam String name) {
        String query = String.format("%s, Colombo, Western Province, Sri Lanka", name);
        String url = String.format("%s?q=%s&format=json&limit=5", NOMINATIM_URL, query);

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(response);
    }
}
