package com.alumniportal.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.alumniportal.dto.ForgotPasswordRequest;
import com.alumniportal.dto.LoginRequest;
import com.alumniportal.dto.RegisterRequest;
import com.alumniportal.dto.ResetPasswordRequest;
import com.alumniportal.dto.VerifyOtpRequest;
import com.alumniportal.entity.User;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.security.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public String register(RegisterRequest request) {

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setActive(true);

        userRepository.save(user);

        return "User Registered Successfully";
    }

    @Override
    public String login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        if (!user.isActive()) {
            return "Account Deactivated";
        }

        boolean isValid = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword());

        if (!isValid) {
            return "Invalid Password";
        }

        return jwtUtil.generateToken(
                user.getEmail());
    }
    
    @Override
    public String forgotPassword(ForgotPasswordRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        String otp =
                String.valueOf(
                        (int)(Math.random() * 900000) + 100000);

        user.setOtp(otp);
        user.setOtpExpiry(
                LocalDateTime.now().plusMinutes(5));

        userRepository.save(user);

        return "Generated OTP : " + otp;
    }
    
    @Override
    public String verifyOtp(VerifyOtpRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if(user == null) {
            return "User Not Found";
        }

        if(!user.getOtp().equals(request.getOtp())) {
            return "Invalid OTP";
        }

        if(LocalDateTime.now()
                .isAfter(user.getOtpExpiry())) {

            return "OTP Expired";
        }

        return "OTP Verified";
    }
    
    @Override
    public String resetPassword(
            ResetPasswordRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElse(null);

        if(user == null) {
            return "User Not Found";
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()));

        user.setOtp(null);
        user.setOtpExpiry(null);

        userRepository.save(user);

        return "Password Reset Successfully";
    }
}