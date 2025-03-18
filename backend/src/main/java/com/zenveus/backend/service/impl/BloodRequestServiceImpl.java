package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.BloodRequestDTO;
import com.zenveus.backend.entity.BloodRequest;
import com.zenveus.backend.repository.BloodRequestRepository;
import com.zenveus.backend.service.BloodRequestService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BloodRequestServiceImpl implements BloodRequestService {

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public BloodRequestDTO createBloodRequest(BloodRequestDTO bloodRequestDTO) {
        BloodRequest bloodRequest = modelMapper.map(bloodRequestDTO, BloodRequest.class);
        bloodRequest = bloodRequestRepository.save(bloodRequest);
        return modelMapper.map(bloodRequest, BloodRequestDTO.class);
    }

    @Override
    public BloodRequestDTO updateBloodRequest(String id, BloodRequestDTO bloodRequestDTO) {
        BloodRequest bloodRequest = bloodRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("Blood request not found"));
        modelMapper.map(bloodRequestDTO, bloodRequest);
        bloodRequest = bloodRequestRepository.save(bloodRequest);
        return modelMapper.map(bloodRequest, BloodRequestDTO.class);
    }

    @Override
    public void deleteBloodRequest(String id) {
        bloodRequestRepository.deleteById(id);
    }

    @Override
    public List<BloodRequestDTO> getAllBloodRequests() {
        return bloodRequestRepository.findAll().stream()
                .map(bloodRequest -> modelMapper.map(bloodRequest, BloodRequestDTO.class))
                .collect(Collectors.toList());
    }
}