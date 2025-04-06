package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.MessageDTO;
import com.zenveus.backend.dto.NotificationDTO;
import com.zenveus.backend.entity.*;
import com.zenveus.backend.repository.NotificationRepository;
import com.zenveus.backend.repository.UserRepository;
import com.zenveus.backend.service.NotificationService;
import com.zenveus.backend.util.Mail;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

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

        String conformDonorId = notification.getDonor().getId();

        // Send email notification
        Message message = notification.getMessage();
        BloodRequest bloodRequest = message.getBloodRequest();
        String requesterId = bloodRequest.getRequester().getId();

        // Send email to the requester
        User requester = userRepository.findById(requesterId).orElseThrow(() -> new RuntimeException("User not found"));

        Donor donor = notification.getDonor();
        User donorUser = userRepository.findById(conformDonorId).orElseThrow(() -> new RuntimeException("User not found"));

        // Send email to the requester
        Mail mail = new Mail();
        String emailContent = "<html>" +
                "<body>" +
                "<h1>Blood Request Confirmation</h1>" +
                "<p>Dear " + requester.getFirstName() + ",</p>" +
                "<p>We are pleased to inform you that a donor has been confirmed for your blood request.</p>" +
                "<p>Donor Details:</p>" +
                "<ul>" +
                "<li>Name: " + donorUser.getFirstName() + " " + donorUser.getLastName() + "</li>" +
                "<li>Blood Type: " + donor.getBloodType() + "</li>" +
                "<li>Contact: " + donorUser.getEmail() + "</li>" +
                "</ul>" +
                "<p>Thank you for using our service.</p>" +
                "</body>" +
                "</html>";

        mail.setTo(requester.getEmail());
        mail.setSubject("Blood Request Confirmation");
        mail.setMsg(emailContent);
        mail.run();
    }


}