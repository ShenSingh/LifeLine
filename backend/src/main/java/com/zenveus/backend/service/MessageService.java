package com.zenveus.backend.service;

import com.zenveus.backend.dto.MessageDTO;

import java.util.List;

public interface MessageService {
    MessageDTO createMessage(MessageDTO messageDTO);
    MessageDTO getMessageById(String id);
    List<MessageDTO> getAllMessages();
    MessageDTO updateMessage(String id, MessageDTO messageDTO);
    void deleteMessage(String id);
}
