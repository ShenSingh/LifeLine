package com.zenveus.backend.repository;

import com.zenveus.backend.entity.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, String> {
  
}
