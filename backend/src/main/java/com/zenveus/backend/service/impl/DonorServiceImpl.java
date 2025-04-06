// backend/src/main/java/com/zenveus/backend/service/impl/DonorServiceImpl.java
package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.DonorDTO;
import com.zenveus.backend.entity.Donor;
import com.zenveus.backend.repository.DonorRepository;
import com.zenveus.backend.service.DonorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public DonorDTO createDonor(DonorDTO donorDTO) {
        Donor donor = modelMapper.map(donorDTO, Donor.class);
        donor = donorRepository.save(donor);
        return modelMapper.map(donor, DonorDTO.class);
    }

    @Override
    public DonorDTO getDonorById(String id) {
        Donor donor = donorRepository.findById(id).orElseThrow(() -> new RuntimeException("Donor not found"));
        return modelMapper.map(donor, DonorDTO.class);
    }

    @Override
    public void deleteDonor(String id) {
        donorRepository.deleteById(id);
    }

    @Override
    public DonorDTO updateDonor(DonorDTO donorDTO) {
        Donor donor = modelMapper.map(donorDTO, Donor.class);
        donor = donorRepository.save(donor);
        return modelMapper.map(donor, DonorDTO.class);
    }
}