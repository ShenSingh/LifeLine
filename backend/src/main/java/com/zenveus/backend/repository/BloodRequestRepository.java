package com.zenveus.backend.repository;

import com.zenveus.backend.entity.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.ZoneId;
import java.util.List;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, String> {

    @Query(value = "SELECT MAX(id) FROM blood_request", nativeQuery = true)
    String findTopByOrderByCreatedAtDesc();

    List<BloodRequest> findByRequesterId(String id);
}
