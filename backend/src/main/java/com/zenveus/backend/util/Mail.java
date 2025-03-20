package com.zenveus.backend.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Mail implements Runnable {
    private String msg;
    private String to;
    private String subject;

    public void outMail() throws MessagingException {
        String from = "lifelinesystem34@gmail.com"; // sender's email address
        String host = "localhost";

        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", 587);

        System.out.println("sending mail");

        Session session = Session.getDefaultInstance(properties, new Authenticator() {
            protected javax.mail.PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("lifelinesystem34@gmail.com", "guwtdagzyuphskgk");  // have to change some settings in SMTP
            }
        });

        MimeMessage mimeMessage = new MimeMessage(session);
        mimeMessage.setFrom(new InternetAddress(from));
        mimeMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
        mimeMessage.setSubject(this.subject);
        mimeMessage.setContent(this.msg, "text/html"); // Set content type to HTML
        Transport.send(mimeMessage);

        System.out.println("sent");
    }

    @Override
    public void run() {
        if (msg != null) {
            try {
                System.out.println("sending mail- call outMail");
                System.out.println("mail-to" + to);
                outMail();
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
        } else {
            System.out.println("not sent. empty msg!");
        }
    }
}