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

            String[] locationParts = bloodRequest.getHospital().getName().split(",\\s*");
            String city = locationParts.length > 1 ? locationParts[1] : "Unknown";
            String country = locationParts.length > 2 ? locationParts[2] : "Unknown";

            String pass = city+", "+country;

            String emailContent = "<html>" +
                    "<body>" +
                    "<h7>Id:"+notificationId+"</h7>"+
                    "<h1>Blood Request</h1>" +
                    "<p>Dear " + firstName + ",</p>" +
                    "<p>We have a blood request for " + bloodRequest.getBloodType() + " from " + bloodRequest.getHospital().getName() + ".</p>" +
                    "<p>Please click the button below if you are able to donate:</p>" +
                    "<a href=\"http://localhost:8181/api/v1/notification/email?notificationId=" + notificationId + "\" style=\"display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;\">Done</a>" +
                    "<a href=\"http://localhost:5173/mapComponent?location=" + java.net.URLEncoder.encode(pass, java.nio.charset.StandardCharsets.UTF_8) + "\" style=\"display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;\">View Direction</a>" +
                    "</body>" +
                    "</html>";

            mail.setTo(email);
            mail.setSubject("Blood Request");
            mail.setMsg(emailContent);
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
}
