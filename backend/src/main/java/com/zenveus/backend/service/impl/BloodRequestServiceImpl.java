package com.zenveus.backend.service.impl;

import com.sun.mail.smtp.SMTPMessage;
import com.zenveus.backend.dto.BloodRequestDTO;
import com.zenveus.backend.dto.MessageDTO;
import com.zenveus.backend.dto.NotificationDTO;
import com.zenveus.backend.entity.*;
import com.zenveus.backend.repository.*;
import com.zenveus.backend.service.BloodRequestService;
import com.zenveus.backend.util.SMTPMailSender;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
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

                    List<Donor> doners = new ArrayList<>();

                    for(Donor donor : donorRepository.findAll()) {
                        if(donor.getBloodType().equals(bloodRequest.getBloodType())) {
                            doners.add(donor);
                        }
                    }

                    for(Donor donor : doners) {

                        User user = userRepository.findById(donor.getId()).orElseThrow(() -> new RuntimeException("User not found"));


                        SMTPMailSender.sendEmail(user.getEmail(), "Blood Request", "Blood request for " + bloodRequest.getBloodType() + " at " + bloodRequest.getHospital().getName());

                        NotificationDTO notificationDTO =new NotificationDTO();
                        notificationDTO.setDonor(donor);
                        notificationDTO.setRequest(bloodRequest);
                        notificationDTO.setStatus("pending");
                        notificationDTO.setCreatedAt(timestamp);

                        // save notification
                        Notification notification = notificationRepository.save(modelMapper.map(notificationDTO, Notification.class));

                        if (notification != null) {
                            System.out.println("Notification sent to donor");
                            return modelMapper.map(bloodRequest, BloodRequestDTO.class);
                        }
                    }
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