package com.alumniportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.alumniportal.dto.DirectoryProfileResponse;
import com.alumniportal.dto.UserProfileRequest;
import com.alumniportal.entity.User;
import com.alumniportal.entity.UserProfile;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.security.JwtUtil;
import com.alumniportal.service.UserProfileService;

@RestController
@RequestMapping("/profile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;
    
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;
    

    @GetMapping("/all")
    public List<DirectoryProfileResponse> getAllProfiles() {

        return userProfileService.getAllProfiles();
    }

    @GetMapping("/search/skill/{skill}")
    public List<DirectoryProfileResponse> searchBySkill(
            @PathVariable String skill) {

        return userProfileService.searchBySkill(skill);

    }
    @PostMapping
    public UserProfile createProfile(
            @RequestHeader("Authorization")
            String authHeader,
            @RequestBody UserProfileRequest request) {

        String token = authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User user =
                userRepository.findByEmail(email)
                .orElseThrow();

        return userProfileService
                .createProfile(user, request);
    }

    
    @GetMapping("/{userId}")
    public UserProfile getProfile(
            @PathVariable Long userId) {

        return userProfileService
                .getProfile(userId);
    }

    @PutMapping("/{userId}")
    public UserProfile updateProfile(
            @PathVariable Long userId,
            @RequestBody UserProfileRequest request) {

        return userProfileService
                .updateProfile(userId,
                        request);
    }
    
    @DeleteMapping("/{userId}")
    public String deleteProfile(
            @PathVariable Long userId) {

        userProfileService.deleteProfile(userId);

        return "Profile Deleted Successfully";
    }
    
    @GetMapping("/search/name/{name}")
    public List<DirectoryProfileResponse> searchByName(
            @PathVariable String name) {

        return userProfileService.searchByName(name);
    }
    
    @GetMapping("/search/company/{company}")
    public List<DirectoryProfileResponse> searchByCompany(
            @PathVariable String company) {

        return userProfileService.searchByCompany(company);
    }
    
    @GetMapping("/search/industry/{industry}")
    public List<DirectoryProfileResponse> searchByIndustry(
            @PathVariable String industry) {

        return userProfileService.searchByIndustry(industry);
    }
    
    @GetMapping("/search/year/{year}")
    public List<DirectoryProfileResponse> searchByGraduationYear(
            @PathVariable Integer year) {

        return userProfileService.searchByGraduationYear(year);
    }
    
    @GetMapping
    public UserProfile getLoggedInUserProfile(
            @RequestHeader("Authorization")
            String authHeader) {

        String token = authHeader.substring(7);

        String email = jwtUtil.extractUsername(token);

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        UserProfile profile =
                userProfileService.getProfile(user.getUserId());

        if(profile == null) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Profile Not Found"
            );
        }

        return profile;
    }
    
    
}
