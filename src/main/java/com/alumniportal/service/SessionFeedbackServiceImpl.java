package com.alumniportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumniportal.dto.SessionFeedbackDto;
import com.alumniportal.entity.MentorshipSession;
import com.alumniportal.entity.SessionFeedback;
import com.alumniportal.entity.User;
import com.alumniportal.repository.MentorshipSessionRepository;
import com.alumniportal.repository.SessionFeedbackRepository;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.security.JwtUtil;

@Service
public class SessionFeedbackServiceImpl
        implements SessionFeedbackService {

    @Autowired
    private SessionFeedbackRepository feedbackRepository;

    @Autowired
    private MentorshipSessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public String submitFeedback(
            String authHeader,
            SessionFeedbackDto dto) {

        String token = authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User student =
                userRepository.findByEmail(email)
                .orElseThrow();

        MentorshipSession session =
                sessionRepository
                .findById(dto.getSessionId())
                .orElseThrow();

        // ✅ Prevent duplicate feedback
        if (feedbackRepository
                .findByStudentUserIdAndSessionSessionId(
                        student.getUserId(),
                        dto.getSessionId())
                .isPresent()) {

            return "Feedback Already Submitted";
        }

        SessionFeedback feedback =
                new SessionFeedback();

        feedback.setStudent(student);
        feedback.setSession(session);
        feedback.setRating(dto.getRating());
        feedback.setComments(dto.getComments());

        feedbackRepository.save(feedback);

        return "Feedback Submitted Successfully";
    }
    
    @Override
    public List<SessionFeedback>
    getMyFeedbacks(String authHeader) {

        String token = authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User student =
                userRepository.findByEmail(email)
                .orElseThrow();

        return feedbackRepository
                .findByStudentUserId(
                        student.getUserId());
    }
    
    @Override
    public List<SessionFeedback>
    getReceivedFeedbacks(
            String authHeader) {

        String token =
                authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User mentor =
                userRepository.findByEmail(email)
                .orElseThrow();

        return feedbackRepository
                .findBySessionMentorUserId(
                        mentor.getUserId());
    }
}
