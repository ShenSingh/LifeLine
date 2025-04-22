package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.MessageDTO;
import com.zenveus.backend.dto.NotificationDTO;
import com.zenveus.backend.entity.*;
import com.zenveus.backend.repository.DonationAppointmentRepository;
import com.zenveus.backend.repository.MessageRepository;
import com.zenveus.backend.repository.NotificationRepository;
import com.zenveus.backend.repository.UserRepository;
import com.zenveus.backend.service.NotificationService;
import com.zenveus.backend.util.Mail;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.threeten.bp.LocalDateTime;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DonationAppointmentRepository donationAppointmentRepository;
    @Autowired
    private MessageRepository messageRepository;

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

        try{

            // create donation appointment
            DonationAppointment donationAppointment = new DonationAppointment();
            donationAppointment.setDonor(donorUser);
            donationAppointment.setRequester(requester);
            donationAppointment.setHospital(message.getBloodRequest().getHospital());

            try {
                // Get blood request created date
                String createdAtStr = message.getBloodRequest().getCreatedAt();
                java.time.LocalDateTime dateTime;

                // Try to parse with DateTimeFormatter
                try {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
                    dateTime = java.time.LocalDateTime.parse(createdAtStr, formatter);
                } catch (Exception e) {
                    // Fallback to current date if parsing fails
                    dateTime = java.time.LocalDateTime.now();
                    System.out.println("Using current date due to parsing error: " + e.getMessage());
                }

                // Add 5 days for the appointment
                java.time.LocalDateTime appointmentDate = dateTime.plusDays(5);
                donationAppointment.setAppointmentDate(appointmentDate);
                donationAppointment.setStatus("Pending");


                    // Save the donation appointment
                DonationAppointment donationAppointment1 = donationAppointmentRepository.save(donationAppointment);

                if (donationAppointment1 != null) {
                    // get the messages aligned with this request
                    List<Message> messages = messageRepository.findByBloodRequestId(bloodRequest.getId());

                    // Get the requester email for each message sent
                    for (Message msg : messages) {
                        User requesterUser = userRepository.findById(msg.getBloodRequest().getRequester().getId()).orElseThrow(() -> new RuntimeException("User not found"));
                        if (requesterUser.getId().equals(conformDonorId)) {
                            continue;
                        }

                        Mail mail = new Mail();
                        mail.setTo(requesterUser.getEmail());
                        mail.setSubject("Blood Request Status");

                        String emailContent = "<!DOCTYPE html>\n" +
                                "<html lang=\"en\">\n" +
                                "<head>\n" +
                                "    <meta charset=\"UTF-8\">\n" +
                                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                                "    <title>Blood Request Update</title>\n" +
                                "</head>\n" +
                                "<body style=\"margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f5f5f5;\">\n" +
                                "    <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);\">\n" +
                                "        <tr>\n" +
                                "            <td style=\"background-color: #e53935; padding: 20px; text-align: center;\">\n" +
                                "                <img src=\"https://i.imgur.com/3AUdd6P.png\" alt=\"LifeLine Logo\" width=\"120\" style=\"margin-bottom: 10px;\">\n" +
                                "                <h1 style=\"color: #ffffff; margin: 0; font-size: 24px;\">Request Fulfilled</h1>\n" +
                                "            </td>\n" +
                                "        </tr>\n" +
                                "        <tr>\n" +
                                "            <td style=\"padding: 30px 30px 20px 30px;\">\n" +
                                "                <p style=\"margin-top: 0; font-size: 16px;\">Dear <strong>" + requesterUser.getFirstName() + "</strong>,</p>\n" +
                                "                <p style=\"font-size: 16px;\">We sincerely thank you for your generous offer to donate blood. Your willingness to help save lives is truly appreciated.</p>\n" +
                                "                \n" +
                                "                <div style=\"background-color: #f9f9f9; border-left: 4px solid #e53935; padding: 15px; margin: 20px 0;\">\n" +
                                "                    <h2 style=\"margin-top: 0; color: #e53935; font-size: 18px;\">Request Details</h2>\n" +
                                "                    <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"font-size: 15px;\">\n" +
                                "                        <tr>\n" +
                                "                            <td style=\"padding: 8px 0;\"><strong>Blood Type Needed:</strong></td>\n" +
                                "                            <td style=\"padding: 8px 0;\"><span style=\"color: #e53935; font-weight: bold;\">" + bloodRequest.getBloodType() + "</span></td>\n" +
                                "                        </tr>\n" +
                                "                        <tr>\n" +
                                "                            <td style=\"padding: 8px 0;\"><strong>Hospital Location:</strong></td>\n" +
                                "                            <td style=\"padding: 8px 0;\">" + bloodRequest.getHospital() + "</td>\n" +
                                "                        </tr>\n" +
                                "                    </table>\n" +
                                "                </div>\n" +
                                "                \n" +
                                "                <p style=\"font-size: 16px;\">We're pleased to inform you that this blood request has now been successfully fulfilled by another donor.</p>\n" +
                                "                \n" +
                                "                <p style=\"font-size: 16px;\">While your specific assistance isn't needed for this case, there are always new requests coming in. We hope we can count on your continued support for future blood donation needs.</p>\n" +
                                "                \n" +
                                "                <p style=\"font-size: 16px;\">Thank you again for being part of our life-saving community!</p>\n" +
                                "            </td>\n" +
                                "        </tr>\n" +
                                "        <tr>\n" +
                                "            <td style=\"padding: 20px 30px; text-align: center; background-color: #f5f5f5; border-top: 1px solid #eeeeee;\">\n" +
                                "                <p style=\"margin: 0; font-size: 14px; color: #777777;\">Your compassion makes a difference.</p>\n" +
                                "                <p style=\"margin: 10px 0 0; font-size: 14px; color: #777777;\">LifeLine Blood Donation Service</p>\n" +
                                "                <div style=\"margin-top: 15px;\">\n" +
                                "                    <a href=\"#\" style=\"display: inline-block; margin: 0 5px; text-decoration: none;\">\n" +
                                "                        <img src=\"https://i.imgur.com/3tBTUDq.png\" alt=\"Website\" width=\"24\" height=\"24\">\n" +
                                "                    </a>\n" +
                                "                    <a href=\"#\" style=\"display: inline-block; margin: 0 5px; text-decoration: none;\">\n" +
                                "                        <img src=\"https://i.imgur.com/Np8mGVD.png\" alt=\"Email\" width=\"24\" height=\"24\">\n" +
                                "                    </a>\n" +
                                "                    <a href=\"#\" style=\"display: inline-block; margin: 0 5px; text-decoration: none;\">\n" +
                                "                        <img src=\"https://i.imgur.com/Ls3ao7z.png\" alt=\"Phone\" width=\"24\" height=\"24\">\n" +
                                "                    </a>\n" +
                                "                </div>\n" +
                                "            </td>\n" +
                                "        </tr>\n" +
                                "    </table>\n" +
                                "</body>\n" +
                                "</html>";

                        mail.setMsg(emailContent);
                        mail.run();
                    }

                    bloodRequest.setStatus("Confirmed");

                    System.out.println("Donation appointment created successfully");
                } else {
                    System.out.println("Failed to create donation appointment");
                }

            } catch (Exception e) {
                System.out.println("Error in donor appointment: " + e.getMessage());
                e.printStackTrace();
            }

            donationAppointment.setStatus("Pending");
            // Save the donation appointment
            donationAppointmentRepository.save(donationAppointment);
            System.out.println("Donation appointment created successfully");
        }catch (Exception e){
            // Log the error message
            System.out.println("Error in donor appointment: " + e.getMessage());
        }


        // Send email to the requester
        Mail mail = new Mail();

        String emailContent = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Blood Request Confirmation</title>\n" +
                "</head>\n" +
                "<body style=\"margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f5f5f5;\">\n" +
                "    <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);\">\n" +
                "        <tr>\n" +
                "            <td style=\"background-color: #e53935; padding: 20px; text-align: center;\">\n" +
                "                <img src=\"https://i.imgur.com/3AUdd6P.png\" alt=\"LifeLine Logo\" width=\"120\" style=\"margin-bottom: 10px;\">\n" +
                "                <h1 style=\"color: #ffffff; margin: 0; font-size: 24px;\">Blood Request Confirmation</h1>\n" +
                "            </td>\n" +
                "        </tr>\n" +
                "        <tr>\n" +
                "            <td style=\"padding: 30px 30px 20px 30px;\">\n" +
                "                <p style=\"margin-top: 0; font-size: 16px;\">Dear <strong>" + requester.getFirstName() + "</strong>,</p>\n" +
                "                <p style=\"font-size: 16px;\">Great news! A donor has been confirmed for your blood request. The donation process has been initiated and an appointment has been scheduled.</p>\n" +
                "                \n" +
                "                <div style=\"background-color: #f9f9f9; border-left: 4px solid #e53935; padding: 15px; margin: 20px 0;\">\n" +
                "                    <h2 style=\"margin-top: 0; color: #e53935; font-size: 18px;\">Donor Details</h2>\n" +
                "                    <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"font-size: 15px;\">\n" +
                "                        <tr>\n" +
                "                            <td width=\"120\" style=\"padding: 8px 0;\"><strong>Name:</strong></td>\n" +
                "                            <td style=\"padding: 8px 0;\">" + donorUser.getFirstName() + " " + donorUser.getLastName() + "</td>\n" +
                "                        </tr>\n" +
                "                        <tr>\n" +
                "                            <td style=\"padding: 8px 0;\"><strong>Blood Type:</strong></td>\n" +
                "                            <td style=\"padding: 8px 0;\"><span style=\"color: #e53935; font-weight: bold;\">" + donor.getBloodType() + "</span></td>\n" +
                "                        </tr>\n" +
                "                        <tr>\n" +
                "                            <td style=\"padding: 8px 0;\"><strong>Contact:</strong></td>\n" +
                "                            <td style=\"padding: 8px 0;\"><a href=\"mailto:" + donorUser.getEmail() + "\" style=\"color: #1e88e5; text-decoration: none;\">" + donorUser.getEmail() + "</a></td>\n" +
                "                        </tr>\n" +
                "                    </table>\n" +
                "                </div>\n" +
                "                \n" +
                "                <p style=\"font-size: 16px;\">An appointment has been scheduled for the donation. You will receive further details about the appointment soon.</p>\n" +
                "                \n" +
                "                <p style=\"font-size: 16px;\">If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>\n" +
                "            </td>\n" +
                "        </tr>\n" +
                "        <tr>\n" +
                "            <td style=\"padding: 20px 30px; text-align: center; background-color: #f5f5f5; border-top: 1px solid #eeeeee;\">\n" +
                "                <p style=\"margin: 0; font-size: 14px; color: #777777;\">Thank you for using our service.</p>\n" +
                "                <p style=\"margin: 10px 0 0; font-size: 14px; color: #777777;\">LifeLine Blood Donation Service</p>\n" +
                "                <div style=\"margin-top: 15px;\">\n" +
                "                    <a href=\"#\" style=\"display: inline-block; margin: 0 5px; text-decoration: none;\">\n" +
                "                        <img src=\"https://i.imgur.com/3tBTUDq.png\" alt=\"Website\" width=\"24\" height=\"24\">\n" +
                "                    </a>\n" +
                "                    <a href=\"#\" style=\"display: inline-block; margin: 0 5px; text-decoration: none;\">\n" +
                "                        <img src=\"https://i.imgur.com/Np8mGVD.png\" alt=\"Email\" width=\"24\" height=\"24\">\n" +
                "                    </a>\n" +
                "                    <a href=\"#\" style=\"display: inline-block; margin: 0 5px; text-decoration: none;\">\n" +
                "                        <img src=\"https://i.imgur.com/Ls3ao7z.png\" alt=\"Phone\" width=\"24\" height=\"24\">\n" +
                "                    </a>\n" +
                "                </div>\n" +
                "            </td>\n" +
                "        </tr>\n" +
                "    </table>\n" +
                "</body>\n" +
                "</html>";

        mail.setTo(requester.getEmail());
        mail.setSubject("Blood Request Confirmation");
        mail.setMsg(emailContent);
        mail.run();
    }


}
