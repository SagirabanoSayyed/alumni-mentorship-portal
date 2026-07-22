package com.alumniportal.service;

import com.alumniportal.dto.StudentDashboardDto;

public interface StudentDashboardService {

    StudentDashboardDto
    getDashboard(String authHeader);
}