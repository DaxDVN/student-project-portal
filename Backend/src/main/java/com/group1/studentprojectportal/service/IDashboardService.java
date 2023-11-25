package com.group1.studentprojectportal.service;

import com.group1.studentprojectportal.constant.Roles;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IDashboardService {
    ResponseEntity<List<Long>> viewDashboard(String role);
}
