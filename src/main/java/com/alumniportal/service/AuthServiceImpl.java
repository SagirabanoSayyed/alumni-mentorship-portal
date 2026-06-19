package com.alumniportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.alumniportal.dto.LoginRequest;
import com.alumniportal.dto.RegisterRequest;
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
}