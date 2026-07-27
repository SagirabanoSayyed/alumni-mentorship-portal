package com.alumniportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alumniportal.dto.AdminDashboardDto;
import com.alumniportal.dto.DashboardResponse;
import com.alumniportal.dto.MentorDashboardResponse;
import com.alumniportal.dto.StudentDashboardDto;
import com.alumniportal.security.JwtUtil;
import com.alumniportal.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public DashboardResponse getDashboard(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        String email = jwtUtil.extractUsername(token);

        return dashboardService.getDashboard(email);
    }
    
    @GetMapping("/student")
    public StudentDashboardDto getStudentDashboard(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        String email = jwtUtil.extractUsername(token);

        return dashboardService.getStudentDashboard(email);
    }
    
    @GetMapping("/mentor")
    public MentorDashboardResponse getMentorDashboard(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        String email = jwtUtil.extractUsername(token);

        return dashboardService.getMentorDashboard(email);
    }
    
    @GetMapping("/alumni")
    public MentorDashboardResponse getAlumniDashboard(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        String email = jwtUtil.extractUsername(token);

        return dashboardService.getAlumniDashboard(email);
    }
    
    @GetMapping("/admin")
    public AdminDashboardDto getAdminDashboard() {

        return dashboardService.getAdminDashboard();
    }
}