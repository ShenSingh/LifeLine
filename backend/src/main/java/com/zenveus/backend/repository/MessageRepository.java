package com.zenveus.backend.repository;

import com.zenveus.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, String> {
    List<Message> findByBloodRequestId(String id);
}
