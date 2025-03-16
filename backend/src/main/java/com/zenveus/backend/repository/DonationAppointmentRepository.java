package com.zenveus.backend.repository;

import com.zenveus.backend.entity.DonationAppointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationAppointmentRepository extends JpaRepository<DonationAppointment, String> {
}
