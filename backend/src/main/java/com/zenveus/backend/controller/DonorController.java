// backend/src/main/java/com/zenveus/backend/controller/DonorController.java
package com.zenveus.backend.controller;

import com.zenveus.backend.dto.DonorDTO;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.service.DonorService;
import com.zenveus.backend.service.UserService;
import com.zenveus.backend.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/v1/donor")
@CrossOrigin(origins = "http://localhost:5173/")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;

    @PostMapping(value = "/create")
    public DonorDTO createDonor(@RequestHeader("Authorization") String token, @RequestBody DonorDTO donorDTO) {

        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("con class >>"+donorDTO);

        String tokens = token.replace("Bearer ", "");
        Claims claims = jwtUtil.getAllClaimsFromToken(tokens);

        String email = claims.getSubject();

        User user = userService.getUserByEmail(email);

        System.out.println("User email: " + user.getEmail());
        if (user == null) {
            System.out.println("User not found");
            throw new RuntimeException("User not found");
        }
        System.out.println("User found: " + user);
        donorDTO.setUser(user);

        System.out.println("DonorDTO before save: " + donorDTO);
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

    @PutMapping("/update")
    public DonorDTO updateDonor(@RequestBody DonorDTO donorDTO) {
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("=========================================");
        System.out.println("DonorDTO before update: " + donorDTO);

        return donorService.updateDonor(donorDTO);
    }

    @GetMapping(value = "/all")
    public List<DonorDTO> getAllDonors() {
        return donorService.getAllDonors();
    }
}
