package com.alumniportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumniportal.dto.AdminDashboardDto;
import com.alumniportal.dto.DashboardResponse;
import com.alumniportal.dto.MentorDashboardResponse;
import com.alumniportal.dto.StudentDashboardDto;
import com.alumniportal.entity.User;
import com.alumniportal.enums.Role;
import com.alumniportal.repository.MentorshipRequestRepository;
import com.alumniportal.repository.MentorshipSessionRepository;
import com.alumniportal.repository.SessionFeedbackRepository;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MentorshipRequestRepository requestRepository;

    @Autowired
    private MentorshipSessionRepository sessionRepository;

    @Autowired
    private SessionFeedbackRepository feedbackRepository;
    
    @Override
    public StudentDashboardDto getStudentDashboard(String email) {

        User student = userRepository.findByEmail(email)
                .orElseThrow();

        Long studentId = student.getUserId();

       

        StudentDashboardDto dto = new StudentDashboardDto();

        dto.setFullName(student.getFullName());
        dto.setEmail(student.getEmail());
        dto.setRole(student.getRole().toString());

        dto.setTotalRequests(
                requestRepository.countByStudentUserId(studentId));

        dto.setPendingRequests(
                requestRepository.countByStudentUserIdAndStatus(
                        studentId,
                        "PENDING"));

        dto.setAcceptedRequests(
                requestRepository.countByStudentUserIdAndStatus(
                        studentId,
                        "ACCEPTED"));

        dto.setUpcomingSessions(
                sessionRepository.countByStudentUserIdAndStatus(
                        studentId,
                        "UPCOMING"));

        dto.setCompletedSessions(
                sessionRepository.countByStudentUserIdAndStatus(
                        studentId,
                        "COMPLETED"));

        return dto;

    }

    @Override
    public DashboardResponse getDashboard(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        return new DashboardResponse(
                user.getFullName(),
                user.getEmail(),
                user.getRole().toString()
        );
    }
    
    @Override
    public MentorDashboardResponse getMentorDashboard(String email) {

        User mentor = userRepository
                .findByEmail(email)
                .orElseThrow();

        MentorDashboardResponse response =
                new MentorDashboardResponse();

        response.setFullName(mentor.getFullName());
        response.setEmail(mentor.getEmail());
        response.setRole(mentor.getRole().toString());

        Long mentorId = mentor.getUserId();

        response.setAssignedStudents(
                requestRepository.countByMentorUserIdAndStatus(
                        mentorId,
                        "ACCEPTED"));

        response.setPendingRequests(
                requestRepository.countByMentorUserIdAndStatus(
                        mentorId,
                        "PENDING"));

        response.setAcceptedRequests(
                requestRepository.countByMentorUserIdAndStatus(
                        mentorId,
                        "ACCEPTED"));

        response.setUpcomingSessions(
                sessionRepository.countByMentorUserIdAndStatus(
                        mentorId,
                        "UPCOMING"));

        response.setCompletedSessions(
                sessionRepository.countByMentorUserIdAndStatus(
                        mentorId,
                        "COMPLETED"));

        Double rating =
                feedbackRepository.getAverageRatingByMentorId(
                        mentorId);

        response.setAverageRating(
                rating == null ? 0.0 : rating);

        return response;
    }

    @Override
    public MentorDashboardResponse getAlumniDashboard(String email) {

        User alumni = userRepository
                .findByEmail(email)
                .orElseThrow();

        MentorDashboardResponse response =
                new MentorDashboardResponse();

        response.setFullName(alumni.getFullName());
        response.setEmail(alumni.getEmail());
        response.setRole(alumni.getRole().toString());

        Long alumniId = alumni.getUserId();

        response.setAssignedStudents(
                requestRepository.countByMentorUserIdAndStatus(
                        alumniId,
                        "ACCEPTED"));

        response.setPendingRequests(
                requestRepository.countByMentorUserIdAndStatus(
                        alumniId,
                        "PENDING"));

        response.setAcceptedRequests(
                requestRepository.countByMentorUserIdAndStatus(
                        alumniId,
                        "ACCEPTED"));

        response.setUpcomingSessions(
                sessionRepository.countByMentorUserIdAndStatus(
                        alumniId,
                        "UPCOMING"));

        response.setCompletedSessions(
                sessionRepository.countByMentorUserIdAndStatus(
                        alumniId,
                        "COMPLETED"));

        Double rating = feedbackRepository.getAverageRatingByMentorId(alumniId);

        response.setAverageRating(
                rating == null ? 0.0 : rating);

        return response;
    }
    
    @Override
    public AdminDashboardDto getAdminDashboard() {

        AdminDashboardDto dto = new AdminDashboardDto();

        dto.setTotalUsers(userRepository.count());

        dto.setTotalStudents(userRepository.countByRole(Role.STUDENT));

        dto.setTotalMentors(userRepository.countByRole(Role.MENTOR));

        dto.setTotalAlumni(userRepository.countByRole(Role.ALUMNI));

        dto.setTotalSessions(sessionRepository.count());

        dto.setTotalFeedback(feedbackRepository.count());

        return dto;
    }

	
}