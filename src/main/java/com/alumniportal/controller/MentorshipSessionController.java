package com.alumniportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alumniportal.dto.MentorshipSessionDto;
import com.alumniportal.entity.MentorshipSession;
import com.alumniportal.service.MentorshipSessionService;

@RestController
@RequestMapping("/sessions")
public class MentorshipSessionController {

    @Autowired
    private MentorshipSessionService service;

    @PostMapping
    public String createSession(
            @RequestHeader("Authorization")
            String authHeader,
            @RequestBody
            MentorshipSessionDto dto) {

        return service.createSession(
                authHeader,
                dto);
    }

    @GetMapping("/student")
    public List<MentorshipSession>
    getStudentSessions(
            @RequestHeader("Authorization")
            String authHeader) {

        return service.getStudentSessions(
                authHeader);
    }

    @GetMapping("/mentor")
    public List<MentorshipSession>
    getMentorSessions(
            @RequestHeader("Authorization")
            String authHeader) {

        return service.getMentorSessions(
                authHeader);
    }
    
    @PutMapping("/{id}/complete")
    public String completeSession(
            @PathVariable Long id) {

        return service.completeSession(id);
    }
    
    @PutMapping("/{id}/cancel")
    public String cancelSession(
            @PathVariable Long id) {

        return service.cancelSession(id);
    }
}