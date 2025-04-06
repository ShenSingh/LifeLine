package com.zenveus.backend.service;

import com.zenveus.backend.dto.HospitalDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface HospitalService {
    public void fetchAndSaveHospitals();

    List<HospitalDTO> getHospitals();
}
