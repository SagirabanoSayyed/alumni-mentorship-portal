package com.alumniportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumniportal.dto.DirectoryProfileResponse;
import com.alumniportal.dto.UserProfileRequest;
import com.alumniportal.entity.User;
import com.alumniportal.entity.UserProfile;
import com.alumniportal.repository.UserProfileRepository;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.repository.UserSkillRepository;
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
    
    @Autowired
    private UserSkillRepository userSkillRepository;
    
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
    public List<DirectoryProfileResponse> getAllProfiles() {

        return userProfileRepository.findAll()
                .stream()
                .map(this::mapToDirectoryResponse)
                .toList();
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
    public List<DirectoryProfileResponse> searchByName(String name) {

        return userProfileRepository
                .findByUserFullNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToDirectoryResponse)
                .toList();
    }

    @Override
    public List<DirectoryProfileResponse> searchByCompany(String company) {

        return userProfileRepository
                .findByCompanyContainingIgnoreCase(company)
                .stream()
                .map(this::mapToDirectoryResponse)
                .toList();
    }

    @Override
    public List<DirectoryProfileResponse> searchByIndustry(String industry) {

        return userProfileRepository
                .findByIndustryContainingIgnoreCase(industry)
                .stream()
                .map(this::mapToDirectoryResponse)
                .toList();
    }

    @Override
    public List<DirectoryProfileResponse> searchByGraduationYear(Integer year) {

        return userProfileRepository
                .findByGraduationYear(year)
                .stream()
                .map(this::mapToDirectoryResponse)
                .toList();
    }

    @Override
    public List<DirectoryProfileResponse> searchBySkill(String skillName) {

        return userProfileRepository
                .findProfilesBySkill(skillName)
                .stream()
                .map(this::mapToDirectoryResponse)
                .toList();
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
    
    private DirectoryProfileResponse mapToDirectoryResponse(UserProfile profile) {

        DirectoryProfileResponse dto = new DirectoryProfileResponse();

        dto.setProfileId(profile.getProfileId());
        dto.setUserId(profile.getUser().getUserId());
        dto.setFullName(profile.getUser().getFullName());
        dto.setEmail(profile.getUser().getEmail());
        dto.setRole(profile.getUser().getRole().name());

        dto.setCompany(profile.getCompany());
        dto.setDesignation(profile.getDesignation());
        dto.setIndustry(profile.getIndustry());
        dto.setGraduationYear(profile.getGraduationYear());

        dto.setAboutMe(profile.getAboutMe());
        dto.setGithub(profile.getGithubUrl());
        dto.setLinkedin(profile.getLinkedinUrl());
        dto.setResume(profile.getResumeUrl());
        dto.setProfilePicture(profile.getProfilePicture());

        List<String> skills = userSkillRepository
                .findByUserUserId(profile.getUser().getUserId())
                .stream()
                .map(userSkill -> userSkill.getSkill().getSkillName())
                .toList();

        dto.setSkills(skills);

        return dto;
    }
}
