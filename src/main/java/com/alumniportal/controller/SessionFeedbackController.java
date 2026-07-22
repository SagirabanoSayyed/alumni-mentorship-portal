package com.alumniportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alumniportal.dto.SessionFeedbackDto;
import com.alumniportal.entity.SessionFeedback;
import com.alumniportal.service.SessionFeedbackService;

@RestController
@RequestMapping("/feedback")
public class SessionFeedbackController {

    @Autowired
    private SessionFeedbackService service;

    @PostMapping
    public String submitFeedback(
            @RequestHeader("Authorization")
            String authHeader,
            @RequestBody
            SessionFeedbackDto dto) {

        return service.submitFeedback(
                authHeader,
                dto);
    }

    @GetMapping("/my")
    public List<SessionFeedback>
    getMyFeedbacks(
            @RequestHeader("Authorization")
            String authHeader) {

        return service.getMyFeedbacks(
                authHeader);
    }
    
    @GetMapping("/received")
    public List<SessionFeedback>
    getReceivedFeedbacks(
            @RequestHeader("Authorization")
            String authHeader) {

        return service
                .getReceivedFeedbacks(
                        authHeader);
    }
}
