package com.zenveus.backend.repository;

import com.zenveus.backend.entity.DonationAppointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationAppointmentRepository extends JpaRepository<DonationAppointment, String> {
    List<DonationAppointment> findByDonorId(String userId);
}
