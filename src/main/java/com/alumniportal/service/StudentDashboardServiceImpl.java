package com.alumniportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumniportal.dto.StudentDashboardDto;
import com.alumniportal.entity.User;
import com.alumniportal.repository.MentorshipRequestRepository;
import com.alumniportal.repository.MentorshipSessionRepository;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.security.JwtUtil;

@Service
public class StudentDashboardServiceImpl
        implements StudentDashboardService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MentorshipRequestRepository requestRepository;

    @Autowired
    private MentorshipSessionRepository sessionRepository;

    @Override
    public StudentDashboardDto getDashboard(
            String authHeader) {

        String token =
                authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User student =
                userRepository
                .findByEmail(email)
                .orElseThrow();

        StudentDashboardDto dto =
                new StudentDashboardDto();

        dto.setTotalRequests(
                requestRepository
                .countByStudentUserId(
                        student.getUserId()));

        dto.setAcceptedRequests(
                requestRepository
                .countByStudentUserIdAndStatus(
                        student.getUserId(),
                        "ACCEPTED"));

        dto.setUpcomingSessions(
                sessionRepository
                .countByStudentUserIdAndStatus(
                        student.getUserId(),
                        "SCHEDULED"));

        dto.setCompletedSessions(
                sessionRepository
                .countByStudentUserIdAndStatus(
                        student.getUserId(),
                        "COMPLETED"));

        return dto;
    }
}