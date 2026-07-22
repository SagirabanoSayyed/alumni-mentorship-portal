package com.alumniportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alumniportal.dto.DashboardResponse;
import com.alumniportal.entity.User;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.security.JwtUtil;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public DashboardResponse getDashboard(
            @RequestHeader("Authorization")
            String authHeader) {
    	 System.out.println("AUTH HEADER = " + authHeader);
        String token =
                authHeader.substring(7);

        String email =
                jwtUtil.extractUsername(token);

        User user =
                userRepository
                .findByEmail(email)
                .orElseThrow();

        return new DashboardResponse(
                user.getFullName(),
                user.getEmail(),
                user.getRole().toString()
        );
    }
}
