package com.alumniportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumniportal.dto.MentorshipRequestDto;
import com.alumniportal.entity.MentorshipRequest;
import com.alumniportal.entity.User;
import com.alumniportal.repository.MentorshipRequestRepository;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.security.JwtUtil;

@Service
public class MentorshipRequestServiceImpl
        implements MentorshipRequestService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MentorshipRequestRepository requestRepository;

    @Override
    public String sendRequest(
            String authHeader,
            MentorshipRequestDto request) {

        String token = authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User student =
                userRepository
                .findByEmail(email)
                .orElseThrow();

        User mentor =
                userRepository
                .findById(request.getMentorId())
                .orElseThrow();
        
        List<MentorshipRequest> existingRequests =
                requestRepository
                .findByStudentUserIdAndMentorUserId(
                        student.getUserId(),
                        mentor.getUserId());

        if(!existingRequests.isEmpty()) {
            return "Request Already Sent";
        }

        MentorshipRequest mentorshipRequest =
                new MentorshipRequest();

        mentorshipRequest.setStudent(student);
        mentorshipRequest.setMentor(mentor);
        mentorshipRequest.setMessage(
                request.getMessage());
        mentorshipRequest.setStatus("PENDING");

        requestRepository.save(
                mentorshipRequest);

        return "Request Sent Successfully";
    }
    
    @Override
    public List<MentorshipRequest> getReceivedRequests(
            String authHeader) {

        String token = authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User mentor =
                userRepository.findByEmail(email)
                .orElseThrow();

        return requestRepository
                .findByMentorUserId(
                        mentor.getUserId());
    }
    
    @Override
    public String acceptRequest(Long requestId) {

        MentorshipRequest request =
                requestRepository.findById(requestId)
                .orElseThrow();

        request.setStatus("ACCEPTED");

        requestRepository.save(request);

        return "Request Accepted";
    }
    
    @Override
    public String rejectRequest(Long requestId) {

        MentorshipRequest request =
                requestRepository.findById(requestId)
                .orElseThrow();

        request.setStatus("REJECTED");

        requestRepository.save(request);

        return "Request Rejected";
    }

    @Override
    public List<MentorshipRequest> getMyRequests(
            String authHeader) {

        String token = authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User student =
                userRepository.findByEmail(email)
                .orElseThrow();

        return requestRepository
                .findByStudentUserId(
                        student.getUserId());
    }
    
    @Override
    public List<MentorshipRequest>
    getAcceptedRequests(String authHeader) {

        String token = authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User mentor =
                userRepository.findByEmail(email)
                .orElseThrow();

        return requestRepository
                .findByMentorUserId(
                        mentor.getUserId())
                .stream()
                .filter(request ->
                        "ACCEPTED".equals(
                                request.getStatus()))
                .toList();
    }
}
