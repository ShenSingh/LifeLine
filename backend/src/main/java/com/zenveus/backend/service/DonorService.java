package com.zenveus.backend.service;

import com.zenveus.backend.dto.DonorDTO;

import java.util.List;

public interface DonorService {
    DonorDTO createDonor(DonorDTO donorDTO);
    DonorDTO getDonorById(String id);
    void deleteDonor(String id);
    DonorDTO updateDonor(DonorDTO donorDTO);

    List<DonorDTO> getAllDonors();
}
