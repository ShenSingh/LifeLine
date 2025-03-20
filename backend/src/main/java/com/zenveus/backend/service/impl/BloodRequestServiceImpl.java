package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.BloodRequestDTO;
import com.zenveus.backend.dto.MessageDTO;
import com.zenveus.backend.dto.NotificationDTO;
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


    @Override
    public BloodRequestDTO createBloodRequest(BloodRequestDTO bloodRequestDTO) {

        try {

            BloodRequest bloodRequest = bloodRequestRepository.save(modelMapper.map(bloodRequestDTO, BloodRequest.class));
            LocalDateTime timestamp = LocalDateTime.now();

            if (bloodRequest != null) {
                MessageDTO messageDTO = new MessageDTO();
                messageDTO.setBloodRequest(bloodRequest);
                messageDTO.setTimestamp(timestamp);

                Message message = messageRepository.save(modelMapper.map(messageDTO, Message.class));

                if (message != null) {
                    // filter doner
                    List<Donor> donors = new ArrayList<>();

                    BloodType reqBloodType = BloodType.valueOf(bloodRequest.getBloodType());

                    for(Donor donor : donorRepository.findAll()) {

                        BloodType bloodType = donor.getBloodType();

                        if(donor.getBloodType().equals(reqBloodType)) {
                            System.out.println(bloodRequest.getBloodType());
                            donors.add(donor);
                        }
                    }

                    System.out.println("donors"+donors);

                    for(Donor donor : donors) {
                        User user = userRepository.findById(donor.getId()).orElseThrow(() -> new RuntimeException("User not found"));

                        NotificationDTO notificationDTO =new NotificationDTO();
                        notificationDTO.setDonor(donor);
                        notificationDTO.setRequest(bloodRequest);
                        notificationDTO.setStatus("pending");
                        notificationDTO.setCreatedAt(timestamp);

                        // save notification
                        Notification notification = notificationRepository.save(modelMapper.map(notificationDTO, Notification.class));

                        if (notification != null) {
                            System.out.println("Notification sent to donor");

                            System.out.println(notification.getId()+"  not id eka");

                            // send mail
                            boolean sendOk =sendMail(user.getFirstName(),user.getEmail(), bloodRequest, notification.getId());

                        }else {
                            return null;
                        }
                    }

                    return modelMapper.map(bloodRequest, BloodRequestDTO.class);
                    // get donor mail sent
                }

            }else {
                throw new RuntimeException("Blood request not found");
            }


            return null;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }

    private boolean sendMail(String firstName, String email, BloodRequest bloodRequest, String notificationId) {
        try {
            Mail mail = new Mail();

            String emailContent = "<html>" +
                    "<body>" +
                    "<h7>Id:"+notificationId+"</h7>"+
                    "<h1>Blood Request</h1>" +
                    "<p>Dear " + firstName + ",</p>" +
                    "<p>We have a blood request for " + bloodRequest.getBloodType() + " from " + bloodRequest.getHospital().getName() + ".</p>" +
                    "<p>Please click the button below if you are able to donate:</p>" +
                    "<a href=\"http://localhost:8181/api/v1/notification/email?notificationId=" + notificationId + "\" style=\"display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;\">Done</a>" +
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
        return bloodRequestRepository.findAll().stream()
                .map(bloodRequest -> modelMapper.map(bloodRequest, BloodRequestDTO.class))
                .collect(Collectors.toList());
    }
}