package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.NotificationDTO;
import com.zenveus.backend.entity.Notification;
import com.zenveus.backend.repository.NotificationRepository;
import com.zenveus.backend.service.NotificationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public NotificationDTO createNotification(NotificationDTO notificationDTO) {
        Notification notification = modelMapper.map(notificationDTO, Notification.class);
        notification = notificationRepository.save(notification);
        return modelMapper.map(notification, NotificationDTO.class);
    }

    @Override
    public NotificationDTO getNotificationById(String id) {
        Notification notification = notificationRepository.findById(id).orElseThrow(() -> new RuntimeException("Notification not found"));
        return modelMapper.map(notification, NotificationDTO.class);
    }

    @Override
    public void deleteNotification(String id) {
        notificationRepository.deleteById(id);
    }

    @Override
    public NotificationDTO updateNotification(NotificationDTO notificationDTO) {
        Notification notification = modelMapper.map(notificationDTO, Notification.class);
        notification = notificationRepository.save(notification);
        return modelMapper.map(notification, NotificationDTO.class);
    }

    @Override
    public void processEmailNotification(String notificationId) {
        // Find the notification by requestId
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(() -> new RuntimeException("Notification not found"));

        // Update the notification status
        notification.setStatus("confirmed");
        notificationRepository.save(notification);
        System.out.println("Notification processed successfully");

    }


}