package com.alumniportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.alumniportal.dto.ForgotPasswordRequest;
import com.alumniportal.dto.LoginRequest;
import com.alumniportal.dto.RegisterRequest;
import com.alumniportal.dto.ResetPasswordRequest;
import com.alumniportal.dto.VerifyOtpRequest;
import com.alumniportal.entity.User;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/register")
	public String register(
	       @Valid @RequestBody RegisterRequest request) {

	    return authService.register(request);
	}
    
    @PostMapping("/login")
    public String login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }
    
    @PostMapping("/forgot-password")
    public String forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        return authService.forgotPassword(request);
    }
    
    @PostMapping("/verify-otp")
    public String verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        return authService.verifyOtp(request);
    }
    
    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestBody ResetPasswordRequest request) {

        return authService.resetPassword(request);
    }
}
