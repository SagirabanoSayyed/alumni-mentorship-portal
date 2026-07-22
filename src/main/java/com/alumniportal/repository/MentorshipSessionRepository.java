package com.alumniportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumniportal.entity.MentorshipSession;

public interface MentorshipSessionRepository
        extends JpaRepository<MentorshipSession, Long> {

    List<MentorshipSession>
        findByStudentUserId(Long studentId);

    List<MentorshipSession>
        findByMentorUserId(Long mentorId);

    long countByStudentUserIdAndStatus(
            Long userId,
            String status);
    
    boolean existsByStudentUserIdAndMentorUserIdAndStatus(
            Long studentId,
            Long mentorId,
            String status);
}