package com.zenveus.backend.controller;

import com.zenveus.backend.dto.NotificationDTO;
import com.zenveus.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/notification")
@CrossOrigin(origins = "http://localhost:5173/")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public NotificationDTO createNotification(@RequestBody NotificationDTO notificationDTO) {
        return notificationService.createNotification(notificationDTO);
    }

    @GetMapping("/{id}")
    public NotificationDTO getNotificationById(@PathVariable String id) {
        return notificationService.getNotificationById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable String id) {
        notificationService.deleteNotification(id);
    }

    @PutMapping
    public NotificationDTO updateNotification(@RequestBody NotificationDTO notificationDTO) {
        return notificationService.updateNotification(notificationDTO);
    }



    @GetMapping("/email")
    public ResponseEntity<String> handleEmailNotification(@RequestParam String notificationId) {
        try {
            notificationService.processEmailNotification(notificationId);
            return ResponseEntity.ok("Notification processed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Notification not found");
        }
    }
}
