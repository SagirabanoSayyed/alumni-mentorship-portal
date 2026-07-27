package com.alumniportal.service;

import java.util.List;

import com.alumniportal.dto.DirectoryProfileResponse;
import com.alumniportal.dto.UserProfileRequest;
import com.alumniportal.entity.User;
import com.alumniportal.entity.UserProfile;

public interface UserProfileService {

	UserProfile createProfile(
	        User user,
	        UserProfileRequest request);

    UserProfile getProfile(Long userId);

    UserProfile updateProfile(Long userId,
                              UserProfileRequest request);
    
    void deleteProfile(Long userId);
    
    List<DirectoryProfileResponse> getAllProfiles();

    List<DirectoryProfileResponse> searchBySkill(String skillName);

    List<DirectoryProfileResponse> searchByName(String name);

    List<DirectoryProfileResponse> searchByCompany(String company);

    List<DirectoryProfileResponse> searchByIndustry(String industry);

    List<DirectoryProfileResponse> searchByGraduationYear(Integer year);

	String deleteProfile(String authHeader);
}
