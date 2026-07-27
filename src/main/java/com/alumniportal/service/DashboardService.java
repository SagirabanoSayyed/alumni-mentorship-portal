package com.alumniportal.service;

import com.alumniportal.dto.AdminDashboardDto;
import com.alumniportal.dto.DashboardResponse;
import com.alumniportal.dto.MentorDashboardResponse;
import com.alumniportal.dto.StudentDashboardDto;

public interface DashboardService {
	
	DashboardResponse getDashboard(String email);
	
	StudentDashboardDto getStudentDashboard(String email);

    MentorDashboardResponse getMentorDashboard(String email);
    
    AdminDashboardDto getAdminDashboard();
    
    MentorDashboardResponse getAlumniDashboard(String email);

}