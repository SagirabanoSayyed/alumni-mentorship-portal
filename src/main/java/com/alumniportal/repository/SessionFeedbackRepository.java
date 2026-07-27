package com.alumniportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alumniportal.entity.SessionFeedback;

public interface SessionFeedbackRepository
        extends JpaRepository<SessionFeedback, Long> {

    List<SessionFeedback>
        findByStudentUserId(Long studentId);

    List<SessionFeedback>
        findBySessionSessionId(Long sessionId);
    
    List<SessionFeedback>
    findBySessionMentorUserId(Long mentorId);
    
    Optional<SessionFeedback> findByStudentUserIdAndSessionSessionId(
            Long studentId,
            Long sessionId);
    
    @Query("""
    	       SELECT COALESCE(AVG(f.rating), 0)
    	       FROM SessionFeedback f
    	       WHERE f.session.mentor.userId = :mentorId
    	       """)
    	Double getAverageRatingByMentorId(
    	        @Param("mentorId") Long mentorId);
}