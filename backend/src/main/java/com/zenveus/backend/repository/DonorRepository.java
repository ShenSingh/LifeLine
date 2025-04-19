package com.zenveus.backend.repository;

import com.zenveus.backend.entity.Donor;
import com.zenveus.backend.util.BloodType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DonorRepository extends JpaRepository<Donor, String> {
    @Query(value = "SELECT * FROM donor WHERE id = :userId", nativeQuery = true)
    Donor findDonorByUserId(@Param("userId") String userId);

    Iterable<Object> findByBloodType(BloodType requestedType);
}
