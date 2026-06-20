package com.alumniportal.service;

import java.util.List;

import com.alumniportal.dto.UserProfileRequest;
import com.alumniportal.entity.UserProfile;

public interface UserProfileService {

    UserProfile createProfile(UserProfileRequest request);

    UserProfile getProfile(Long userId);

    UserProfile updateProfile(Long userId,
                              UserProfileRequest request);
    
    void deleteProfile(Long userId);
    
    List<UserProfile> searchByName(String name);

    List<UserProfile> searchByCompany(String company);

    List<UserProfile> searchByIndustry(String industry);

    List<UserProfile> searchByGraduationYear(Integer year);
}
