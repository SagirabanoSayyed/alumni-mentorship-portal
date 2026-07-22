package com.alumniportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alumniportal.dto.StudentDashboardDto;
import com.alumniportal.service.StudentDashboardService;

@RestController
@RequestMapping("/dashboard")
public class StudentDashboardController {

    @Autowired
    private StudentDashboardService service;

    @GetMapping("/student")
    public StudentDashboardDto getDashboard(
            @RequestHeader("Authorization")
            String authHeader) {

        return service.getDashboard(authHeader);
    }
}