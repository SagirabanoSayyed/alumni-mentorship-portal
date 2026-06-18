package com.alumniportal.service;

import com.alumniportal.dto.LoginRequest;
import com.alumniportal.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    String login(LoginRequest request);

}
