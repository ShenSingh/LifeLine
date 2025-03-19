package com.zenveus.backend.service;

import com.zenveus.backend.dto.NotificationDTO;

public interface NotificationService {
    NotificationDTO createNotification(NotificationDTO notificationDTO);
    NotificationDTO getNotificationById(String id);
    void deleteNotification(String id);
    NotificationDTO updateNotification(NotificationDTO notificationDTO);
}
