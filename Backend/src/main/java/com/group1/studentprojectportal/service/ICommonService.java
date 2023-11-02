package com.group1.studentprojectportal.service;

import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface ICommonService {
    void sendMailSender(String toEmail, String subject, String body)
            throws MessagingException, UnsupportedEncodingException;
}
