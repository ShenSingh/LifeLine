// backend/src/main/java/com/zenveus/backend/controller/DonorController.java
package com.zenveus.backend.controller;

import com.zenveus.backend.dto.DonorDTO;
import com.zenveus.backend.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/donor")
@CrossOrigin(origins = "http://localhost:5173/")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @PostMapping
    public DonorDTO createDonor(@RequestBody DonorDTO donorDTO) {
        return donorService.createDonor(donorDTO);
    }

    @GetMapping("/{id}")
    public DonorDTO getDonorById(@PathVariable String id) {
        return donorService.getDonorById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteDonor(@PathVariable String id) {
        donorService.deleteDonor(id);
    }

    @PutMapping
    public DonorDTO updateDonor(@RequestBody DonorDTO donorDTO) {
        return donorService.updateDonor(donorDTO);
    }
}