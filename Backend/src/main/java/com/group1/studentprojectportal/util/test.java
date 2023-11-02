package com.group1.studentprojectportal.util;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

public class test {
    public static void main(String[] args) {
        TimeZone vietnamTimeZone = TimeZone.getTimeZone("Asia/Saigon");
        SimpleDateFormat vietnamDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        vietnamDateFormat.setTimeZone(vietnamTimeZone);
        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        String vietnamTime = vietnamDateFormat.format(currentTimestamp);
        System.out.println(vietnamTime);
    }
}
