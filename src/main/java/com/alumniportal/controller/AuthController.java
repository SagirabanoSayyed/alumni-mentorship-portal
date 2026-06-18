package com.alumniportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.alumniportal.dto.LoginRequest;
import com.alumniportal.dto.RegisterRequest;
import com.alumniportal.entity.User;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping("/register")
	public String register(
	        @RequestBody RegisterRequest request) {

	    return authService.register(request);
	}
    
    @PostMapping("/login")
    public String login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}
