package com.zenveus.backend.controller;

import com.zenveus.backend.dto.ChatMessage;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage handleChatMessage(ChatMessage message) {
        // Add timestamp before broadcasting
        message.setTimestamp(LocalDateTime.now().toString());
        return message;
    }
}
