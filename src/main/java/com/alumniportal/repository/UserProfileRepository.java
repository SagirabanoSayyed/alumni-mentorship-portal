package com.alumniportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.alumniportal.entity.UserProfile;

public interface UserProfileRepository
        extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByUserUserId(Long userId);

    List<UserProfile> findByUserFullNameContainingIgnoreCase(String fullName);

    List<UserProfile> findByCompanyContainingIgnoreCase(String company);

    List<UserProfile> findByIndustryContainingIgnoreCase(String industry);

    List<UserProfile> findByGraduationYear(Integer graduationYear);
    
    @Query("""
    		SELECT p
    		FROM UserProfile p
    		WHERE (:name IS NULL OR LOWER(p.user.fullName) LIKE LOWER(CONCAT('%', :name, '%')))
    		AND (:company IS NULL OR LOWER(p.company) LIKE LOWER(CONCAT('%', :company, '%')))
    		AND (:industry IS NULL OR LOWER(p.industry) LIKE LOWER(CONCAT('%', :industry, '%')))
    		AND (:year IS NULL OR p.graduationYear = :year)
    		""")
    		List<UserProfile> searchProfiles(
    		        @Param("name") String name,
    		        @Param("company") String company,
    		        @Param("industry") String industry,
    		        @Param("year") Integer year);

}
