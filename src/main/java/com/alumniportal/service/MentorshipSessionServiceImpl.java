package com.alumniportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumniportal.dto.MentorshipSessionDto;
import com.alumniportal.entity.MentorshipRequest;
import com.alumniportal.entity.MentorshipSession;
import com.alumniportal.entity.User;
import com.alumniportal.repository.MentorshipRequestRepository;
import com.alumniportal.repository.MentorshipSessionRepository;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.security.JwtUtil;

@Service
public class MentorshipSessionServiceImpl
        implements MentorshipSessionService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MentorshipRequestRepository requestRepository;

    @Autowired
    private MentorshipSessionRepository sessionRepository;

    @Override
    public String createSession(
            String authHeader,
            MentorshipSessionDto dto) {

        String token = authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User mentor =
                userRepository.findByEmail(email)
                .orElseThrow();

        MentorshipRequest request =
                requestRepository.findById(
                        dto.getRequestId())
                .orElseThrow();

        if (!"ACCEPTED".equals(
                request.getStatus())) {

            return "Only accepted requests can be scheduled";
        }

        MentorshipSession session =
                new MentorshipSession();

        session.setRequest(request);
        session.setStudent(
                request.getStudent());
        session.setMentor(
                mentor);

        session.setSessionDate(
                dto.getSessionDate());

        session.setSessionTime(
                dto.getSessionTime());

        session.setMeetingLink(
                dto.getMeetingLink());

        session.setStatus(
                "SCHEDULED");

        User student = request.getStudent();

        boolean alreadyExists =
                sessionRepository
                .existsByStudentUserIdAndMentorUserIdAndStatus(
                        student.getUserId(),
                        mentor.getUserId(),
                        "SCHEDULED");

        if(alreadyExists) {
            return "Session Already Scheduled";
        }
        sessionRepository.save(
                session);

        return "Session Scheduled Successfully";
    }

    @Override
    public List<MentorshipSession>
    getStudentSessions(
            String authHeader) {

        String token =
                authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User student =
                userRepository.findByEmail(email)
                .orElseThrow();

        return sessionRepository
                .findByStudentUserId(
                        student.getUserId());
    }

    @Override
    public List<MentorshipSession>
    getMentorSessions(
            String authHeader) {

        String token =
                authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User mentor =
                userRepository.findByEmail(email)
                .orElseThrow();

        return sessionRepository
                .findByMentorUserId(
                        mentor.getUserId());
    }
    
    @Override
    public String completeSession(Long sessionId) {

        MentorshipSession session =
                sessionRepository
                .findById(sessionId)
                .orElseThrow();

        session.setStatus("COMPLETED");

        sessionRepository.save(session);

        return "Session Completed";
    }
    
    @Override
    public String cancelSession(Long sessionId) {

        MentorshipSession session =
                sessionRepository
                .findById(sessionId)
                .orElseThrow();

        session.setStatus("CANCELLED");

        sessionRepository.save(session);

        return "Session Cancelled";
    }
}
