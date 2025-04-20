// backend/src/main/java/com/zenveus/backend/service/impl/DonorServiceImpl.java
package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.DonorDTO;
import com.zenveus.backend.entity.Donor;
import com.zenveus.backend.entity.User;
import com.zenveus.backend.repository.DonorRepository;
import com.zenveus.backend.repository.UserRepository;
import com.zenveus.backend.service.DonorService;
import com.zenveus.backend.util.Role;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public DonorDTO createDonor(DonorDTO donorDTO) {

        try{
            Donor regDonor = new Donor();
            regDonor.setAge(donorDTO.getAge());
            regDonor.setBloodType(donorDTO.getBloodType());
            regDonor.setGender(donorDTO.getGender());
            regDonor.setLastDonationDate(donorDTO.getLastDonationDate());
            regDonor.setLongTermIllness(donorDTO.isLongTermIllness());
            regDonor.setNumberOfTimesDonated(donorDTO.getNumberOfTimesDonated());
            regDonor.setTakingMedicine(donorDTO.isTakingMedicine());
            regDonor.setWillingToDonateFrequency(donorDTO.getWillingToDonateFrequency());
            regDonor.setUser(donorDTO.getUser());

            System.out.println("Donor before save: " + regDonor);
            regDonor = donorRepository.save(regDonor);
            System.out.println("Donor after save: " + regDonor);


            if (regDonor.getId() != null) {
                User user = regDonor.getUser();

                user.setRole(Role.DONOR);

                User updateUser = userRepository.save(user);
                return modelMapper.map(regDonor, DonorDTO.class);
            }

            return null;
        }catch (Exception e){
            // Log the error message
            System.out.println("Error in createDonor: " + e.getMessage());
        }
        return null;
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

    @Override
    public List<DonorDTO> getAllDonors() {
        List<Donor> donors = donorRepository.findAll();
        return donors.stream()
                .map(donor -> modelMapper.map(donor, DonorDTO.class))
                .toList();
    }
}
