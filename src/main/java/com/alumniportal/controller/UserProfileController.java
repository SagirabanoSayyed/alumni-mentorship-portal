package com.alumniportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alumniportal.dto.UserProfileRequest;
import com.alumniportal.entity.UserProfile;
import com.alumniportal.service.UserProfileService;

@RestController
@RequestMapping("/profile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @PostMapping
    public UserProfile createProfile(
            @RequestBody UserProfileRequest request) {

        return userProfileService
                .createProfile(request);
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
    public List<UserProfile> searchByName(
            @PathVariable String name) {

        return userProfileService.searchByName(name);
    }
    
    @GetMapping("/search/company/{company}")
    public List<UserProfile> searchByCompany(
            @PathVariable String company) {

        return userProfileService.searchByCompany(company);
    }
    
    @GetMapping("/search/industry/{industry}")
    public List<UserProfile> searchByIndustry(
            @PathVariable String industry) {

        return userProfileService.searchByIndustry(industry);
    }
    
    @GetMapping("/search/year/{year}")
    public List<UserProfile> searchByGraduationYear(
            @PathVariable Integer year) {

        return userProfileService.searchByGraduationYear(year);
    }
}
