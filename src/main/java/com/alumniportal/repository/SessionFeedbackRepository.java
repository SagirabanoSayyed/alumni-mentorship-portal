package com.alumniportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumniportal.entity.SessionFeedback;

public interface SessionFeedbackRepository
        extends JpaRepository<SessionFeedback, Long> {

    List<SessionFeedback>
        findByStudentUserId(Long studentId);

    List<SessionFeedback>
        findBySessionSessionId(Long sessionId);
    
    List<SessionFeedback>
    findBySessionMentorUserId(Long mentorId);
}