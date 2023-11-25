package com.group1.studentprojectportal.controller;

import com.group1.studentprojectportal.payload.AssignmentDto;
import com.group1.studentprojectportal.service.IDashboardService;
import com.group1.studentprojectportal.service.impl.SubjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final static Logger log = LoggerFactory.getLogger(SubjectService.class);
    private final IDashboardService dashboardService;

    public DashboardController(IDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }
    @GetMapping("/{role}")
    public ResponseEntity<List<Long>> viewDashboard(
            @PathVariable String role
    ) {
        return dashboardService.viewDashboard(role);
    }
}
