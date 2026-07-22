package com.alumniportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumniportal.dto.UserProfileRequest;
import com.alumniportal.entity.User;
import com.alumniportal.entity.UserProfile;
import com.alumniportal.repository.UserProfileRepository;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.security.JwtUtil;

@Service
public class UserProfileServiceImpl
        implements UserProfileService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Override
    public UserProfile createProfile(
            User user,
            UserProfileRequest request) {

        UserProfile profile =
                new UserProfile();

        profile.setUser(user);

        profile.setAboutMe(
                request.getAboutMe());

        profile.setCompany(
                request.getCompany());

        profile.setDesignation(
                request.getDesignation());

        profile.setIndustry(
                request.getIndustry());

        profile.setGraduationYear(
                request.getGraduationYear());

        profile.setLinkedinUrl(
                request.getLinkedinUrl());

        profile.setGithubUrl(
                request.getGithubUrl());

        profile.setResumeUrl(
                request.getResumeUrl());

        profile.setProfilePicture(
                request.getProfilePicture());

        return userProfileRepository.save(profile);
    }
    
    @Override
    public List<UserProfile> getAllProfiles() {

        return userProfileRepository.findAll();
    }

    @Override
    public UserProfile getProfile(Long userId) {

        return userProfileRepository
                .findByUserUserId(userId)
                .orElse(null);
    }

    @Override
    public UserProfile updateProfile(
            Long userId,
            UserProfileRequest request) {

        UserProfile profile =
                userProfileRepository
                .findByUserUserId(userId)
                .orElse(null);

        if (profile == null) {
            return null;
        }

        profile.setAboutMe(request.getAboutMe());
        profile.setCompany(request.getCompany());
        profile.setDesignation(request.getDesignation());
        profile.setIndustry(request.getIndustry());
        profile.setGraduationYear(request.getGraduationYear());
        profile.setLinkedinUrl(request.getLinkedinUrl());
        profile.setGithubUrl(request.getGithubUrl());
        profile.setResumeUrl(request.getResumeUrl());
        profile.setProfilePicture(
                request.getProfilePicture());

        return userProfileRepository.save(profile);
    }
    
    @Override
    public void deleteProfile(Long userId) {

        UserProfile profile =
                userProfileRepository
                .findByUserUserId(userId)
                .orElse(null);

        if(profile != null) {
            userProfileRepository.delete(profile);
        }
    }
    
    @Override
    public List<UserProfile> searchByName(String name) {
        return userProfileRepository
                .findByUserFullNameContainingIgnoreCase(name);
    }

    @Override
    public List<UserProfile> searchByCompany(String company) {
        return userProfileRepository
                .findByCompanyContainingIgnoreCase(company);
    }

    @Override
    public List<UserProfile> searchByIndustry(String industry) {
        return userProfileRepository
                .findByIndustryContainingIgnoreCase(industry);
    }

    @Override
    public List<UserProfile> searchByGraduationYear(Integer year) {
        return userProfileRepository
                .findByGraduationYear(year);
    }
    
    @Override
    public String deleteProfile(
            String authHeader) {

        String token =
                authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User user =
                userRepository
                .findByEmail(email)
                .orElseThrow();

        userRepository.delete(user);

        return "Profile Deleted Successfully";
    }
}
