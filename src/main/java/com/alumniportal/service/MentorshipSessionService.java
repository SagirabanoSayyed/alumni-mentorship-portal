package com.alumniportal.service;

import java.util.List;

import com.alumniportal.dto.MentorshipSessionDto;
import com.alumniportal.entity.MentorshipSession;

public interface MentorshipSessionService {

    String createSession(
            String authHeader,
            MentorshipSessionDto dto);

    List<MentorshipSession>
            getStudentSessions(
                    String authHeader);

    List<MentorshipSession>
            getMentorSessions(
                    String authHeader);
    
    String completeSession(Long sessionId);

    String cancelSession(Long sessionId);
}