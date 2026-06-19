package com.alumniportal.service;

import com.alumniportal.dto.ForgotPasswordRequest;
import com.alumniportal.dto.LoginRequest;
import com.alumniportal.dto.RegisterRequest;
import com.alumniportal.dto.ResetPasswordRequest;
import com.alumniportal.dto.VerifyOtpRequest;

public interface AuthService {

    String register(RegisterRequest request);

    String login(LoginRequest request);
    
    String forgotPassword(ForgotPasswordRequest request);

    String verifyOtp(VerifyOtpRequest request);

    String resetPassword(ResetPasswordRequest request);

}
