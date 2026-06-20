package com.alumniportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumniportal.entity.UserProfile;

public interface UserProfileRepository
        extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByUserUserId(Long userId);

    List<UserProfile> findByUserFullNameContainingIgnoreCase(String fullName);

    List<UserProfile> findByCompanyContainingIgnoreCase(String company);

    List<UserProfile> findByIndustryContainingIgnoreCase(String industry);

    List<UserProfile> findByGraduationYear(Integer graduationYear);

}
