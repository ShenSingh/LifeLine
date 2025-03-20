package com.zenveus.backend.service.impl;

import com.zenveus.backend.dto.MessageDTO;
import com.zenveus.backend.entity.Message;
import com.zenveus.backend.repository.MessageRepository;
import com.zenveus.backend.service.MessageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public MessageDTO createMessage(MessageDTO messageDTO) {
        Message message = modelMapper.map(messageDTO, Message.class);
        message = messageRepository.save(message);
        return modelMapper.map(message, MessageDTO.class);
    }

    @Override
    public MessageDTO getMessageById(String id) {
        Message message = messageRepository.findById(id).orElseThrow(() -> new RuntimeException("Message not found"));
        return modelMapper.map(message, MessageDTO.class);
    }

    @Override
    public List<MessageDTO> getAllMessages() {
        return messageRepository.findAll().stream()
                .map(message -> modelMapper.map(message, MessageDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public MessageDTO updateMessage(String id, MessageDTO messageDTO) {
        Message message = messageRepository.findById(id).orElseThrow(() -> new RuntimeException("Message not found"));
        modelMapper.map(messageDTO, message);
        message = messageRepository.save(message);
        return modelMapper.map(message, MessageDTO.class);
    }

    @Override
    public void deleteMessage(String id) {
        messageRepository.deleteById(id);
    }
}