package com.group1.studentprojectportal.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class DataEncrypt {
    private final static Logger log = LoggerFactory.getLogger(DataEncrypt.class);
    public String base64Encode(String originString){
        return Base64.getEncoder().encodeToString(originString.getBytes());
    }
    public String base64Decode(String originString){
        byte[] decodedBytes = Base64.getDecoder().decode(originString);
        return new String(decodedBytes);
    }


}
