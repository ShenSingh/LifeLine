package com.zenveus.backend.service;

import com.zenveus.backend.dto.BloodRequestDTO;

import java.util.List;

public interface BloodRequestService {
    BloodRequestDTO createBloodRequest(BloodRequestDTO bloodRequestDTO);
    BloodRequestDTO updateBloodRequest(String id, BloodRequestDTO bloodRequestDTO);
    void deleteBloodRequest(String id);
    List<BloodRequestDTO> getAllBloodRequests();
}