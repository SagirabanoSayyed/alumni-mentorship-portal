
package com.alumniportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumniportal.entity.MentorshipRequest;

public interface MentorshipRequestRepository
        extends JpaRepository<MentorshipRequest, Long> {

    List<MentorshipRequest>
        findByStudentUserId(Long userId);

    List<MentorshipRequest>
        findByMentorUserId(Long userId);
    
    List<MentorshipRequest>
    findByStudentUserIdAndMentorUserId(
            Long studentId,
            Long mentorId);

    long countByStudentUserId(Long userId);

    long countByStudentUserIdAndStatus(
            Long userId,
            String status);
    
}
