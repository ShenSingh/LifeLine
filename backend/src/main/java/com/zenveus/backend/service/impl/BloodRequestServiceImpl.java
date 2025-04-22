package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.*;
import com.zenveus.backend.entity.*;
import com.zenveus.backend.repository.*;
import com.zenveus.backend.service.BloodRequestService;
import com.zenveus.backend.util.BloodType;
import com.zenveus.backend.util.Mail;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BloodRequestServiceImpl implements BloodRequestService {

    @Autowired
    private BloodRequestRepository bloodRequestRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HospitalRepository hospitalRepository;


    @Override
    public BloodRequestDTO createBloodRequest(BloodRequestDTO bloodRequestDTO) {
        try {
            // 1. Fetch required entities from DB using DTO IDs
            User requester = userRepository.findById(bloodRequestDTO.getRequester().getId())
                    .orElseThrow(() -> new RuntimeException("Requester not found"));

            Hospital hospital = hospitalRepository.findById(bloodRequestDTO.getHospital().getId())
                    .orElseThrow(() -> new RuntimeException("Hospital not found"));

            // 2. Create and populate BloodRequest entity
            BloodRequest bloodRequest = new BloodRequest();
            bloodRequest.setRequester(requester);
            bloodRequest.setHospital(hospital);
            bloodRequest.setBloodType(bloodRequestDTO.getBloodType().name());
            bloodRequest.setStatus("PENDING");  // Default status

            // 3. Save the blood request
            BloodRequest savedRequest = bloodRequestRepository.save(bloodRequest);
            System.out.println("BloodRequest Saved Successfully: " + savedRequest.getId());

            // 4. Convert saved entity back to DTO with nested objects
            BloodRequestDTO responseDTO = new BloodRequestDTO();
            responseDTO.setId(savedRequest.getId());
            responseDTO.setBloodType(BloodType.valueOf(savedRequest.getBloodType()));
            responseDTO.setStatus(savedRequest.getStatus());
            responseDTO.setCreatedAt(savedRequest.getCreatedAt());

            // Map nested entities to DTOs
            responseDTO.setRequester(modelMapper.map(savedRequest.getRequester(), UserDTO.class));
            responseDTO.setHospital(modelMapper.map(savedRequest.getHospital(), HospitalDTO.class));

            // 5. Notification and messaging logic
            LocalDateTime timestamp = LocalDateTime.now();
            Message message = new Message();
            message.setBloodRequest(savedRequest);
            message.setTimestamp(timestamp);
            messageRepository.save(message);
            System.out.println("Message Saved Successfully");

            // 6. Donor notification logic
            BloodType requestedType = BloodType.valueOf(savedRequest.getBloodType());
            donorRepository.findByBloodType(requestedType).forEach(donor -> {
                Notification notification = new Notification();
                notification.setDonor((Donor) donor);
                notification.setMessage(message);
                notification.setStatus("PENDING");
                notification.setCreatedAt(timestamp);
                notificationRepository.save(notification);

                User donorUser = ((Donor) donor).getUser();
                sendMail(
                        donorUser.getFirstName(),
                        donorUser.getEmail(),
                        savedRequest,
                        notification.getId()
                );
            });

            return responseDTO;

        } catch (Exception e) {
            throw new RuntimeException("Error creating blood request: " + e.getMessage(), e);
        }
    }

    private boolean sendMail(String firstName, String email, BloodRequest bloodRequest, String notificationId) {
        try {
            Mail mail = new Mail();

            String encodedLocation = URLEncoder.encode(bloodRequest.getHospital().getName(), StandardCharsets.UTF_8.toString());
            String mapLink = "http://localhost:5173/mapComponent?location=" + encodedLocation;

            String emailContent = "<!DOCTYPE html>\n" +
                    "<html lang=\"en\">\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                    "    <title>Blood Donation Request</title>\n" +
                    "</head>\n" +
                    "<body style=\"margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f5f5f5;\">\n" +
                    "    <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);\">\n" +
                    "        <tr>\n" +
                    "            <td style=\"background-color: #e53935; padding: 20px; text-align: center;\">\n" +
                    "                <h1 style=\"color: #ffffff; margin: 0; font-size: 24px;\">Urgent Blood Donation Request</h1>\n" +
                    "            </td>\n" +
                    "        </tr>\n" +
                    "        <tr>\n" +
                    "            <td style=\"padding: 30px 30px 20px 30px;\">\n" +
                    "                <p style=\"font-size: 12px; color: #888888; margin-top: 0;\">Request ID: " + notificationId + "</p>\n" +
                    "                <p style=\"margin-top: 15px; font-size: 16px;\">Dear <strong>" + firstName + "</strong>,</p>\n" +
                    "                <p style=\"font-size: 16px;\">We have an urgent blood donation request that matches your blood type. Your donation can save a life today!</p>\n" +
                    "                \n" +
                    "                <div style=\"background-color: #f9f9f9; border-left: 4px solid #e53935; padding: 15px; margin: 20px 0;\">\n" +
                    "                    <h2 style=\"margin-top: 0; color: #e53935; font-size: 18px;\">Request Details</h2>\n" +
                    "                    <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"font-size: 15px;\">\n" +
                    "                        <tr>\n" +
                    "                            <td width=\"120\" style=\"padding: 8px 0;\"><strong>Blood Type:</strong></td>\n" +
                    "                            <td style=\"padding: 8px 0;\"><span style=\"color: #e53935; font-weight: bold;\">" + bloodRequest.getBloodType() + "</span></td>\n" +
                    "                        </tr>\n" +
                    "                        <tr>\n" +
                    "                            <td style=\"padding: 8px 0;\"><strong>Location:</strong></td>\n" +
                    "                            <td style=\"padding: 8px 0;\">" + bloodRequest.getHospital().getName() + "</td>\n" +
                    "                        </tr>\n" +
                    "                    </table>\n" +
                    "                </div>\n" +
                    "                \n" +
                    "                <p style=\"font-size: 16px;\">Your blood donation can make a life-saving difference. If you're available to donate, please confirm using the button below.</p>\n" +
                    "                \n" +
                    "                <div style=\"text-align: center; margin: 30px 0;\">\n" +
                    "                    <a href=\"http://localhost:8181/api/v1/notification/email?notificationId=" + notificationId + "\" style=\"display: inline-block; padding: 12px 24px; margin: 0 5px 10px 5px; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #e53935; text-align: center; text-decoration: none; border-radius: 4px;\">Confirm Donation</a>\n" +
                    "                    <a href=\"" + mapLink + "\" style=\"display: inline-block; padding: 12px 24px; margin: 0 5px 10px 5px; font-size: 16px; font-weight: bold; color: #ffffff; background-color: #4caf50; text-align: center; text-decoration: none; border-radius: 4px;\">View Hospital Directions</a>\n" +
                    "                </div>\n" +
                    "                \n" +
                    "                <p style=\"font-size: 14px; color: #666666;\">Thank you for being a registered blood donor. Your generosity helps us save lives every day.</p>\n" +
                    "            </td>\n" +
                    "        </tr>\n" +
                    "        <tr>\n" +
                    "            <td style=\"padding: 20px; text-align: center; background-color: #f5f5f5; border-top: 1px solid #eeeeee;\">\n" +
                    "                <p style=\"margin: 0; font-size: 14px; color: #777777;\">LifeLine Blood Donation Service</p>\n" +
                    "                <p style=\"margin: 5px 0 0; font-size: 12px; color: #999999;\">Together we save lives</p>\n" +
                    "            </td>\n" +
                    "        </tr>\n" +
                    "    </table>\n" +
                    "</body>\n" +
                    "</html>";
            mail.setSubject("Blood Request");
            mail.setMsg(emailContent);
            mail.setTo(email);
            mail.run();
            return true;
        }catch (Exception e) {
            return false;
        }
    }

    @Override
    public BloodRequestDTO updateBloodRequest(String id, BloodRequestDTO bloodRequestDTO) {
        BloodRequest bloodRequest = bloodRequestRepository.findById(id).orElseThrow(() -> new RuntimeException("Blood request not found"));

        modelMapper.map(bloodRequestDTO, bloodRequest);

        bloodRequest = bloodRequestRepository.save(bloodRequest);
        return modelMapper.map(bloodRequest, BloodRequestDTO.class);
    }

    @Override
    public void deleteBloodRequest(String id) {
        bloodRequestRepository.deleteById(id);
    }

    @Override
    public List<BloodRequestDTO> getAllBloodRequests() {
        List<BloodRequestDTO> bloodRequests = bloodRequestRepository.findAll().stream()
                .map(bloodRequest -> modelMapper.map(bloodRequest, BloodRequestDTO.class))
                .collect(Collectors.toList());

        bloodRequests.forEach(bloodRequest -> System.out.println("Blood Requestsssssss"+bloodRequest));

        return bloodRequests;
    }

    @Override
    public List<BloodRequestDTO> getBloodRequestsByUserId(String id) {
        List<BloodRequest> bloodRequests = bloodRequestRepository.findByRequesterId(id);
        List<BloodRequestDTO> bloodRequestDTOs = new ArrayList<>();

        for (BloodRequest bloodRequest : bloodRequests) {
            BloodRequestDTO bloodRequestDTO = modelMapper.map(bloodRequest, BloodRequestDTO.class);
            bloodRequestDTO.setRequester(modelMapper.map(bloodRequest.getRequester(), UserDTO.class));
            bloodRequestDTO.setHospital(modelMapper.map(bloodRequest.getHospital(), HospitalDTO.class));
            bloodRequestDTOs.add(bloodRequestDTO);
        }

        return bloodRequestDTOs;
    }
}
