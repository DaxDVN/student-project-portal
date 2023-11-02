package com.group1.studentprojectportal.service.impl;

import com.group1.studentprojectportal.service.ICommonService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class CommonService implements ICommonService {
    private final Logger log = LoggerFactory.getLogger(CommonService.class);

    private final JavaMailSender mailSender;

    public CommonService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMailSender(String toEmail,
                               String subject,
                               String body) throws MessagingException, UnsupportedEncodingException {
        String senderName = "Academic Project Manager Team";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("daxnguyen.dvn7723@gmail.com", senderName);
        helper.setTo(toEmail);
        helper.setSubject(subject);
        message.setContent(body, "text/html");
        mailSender.send(message);
        log.info("OK");
    }
}
