package com.alumniportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alumniportal.dto.MentorshipRequestDto;
import com.alumniportal.entity.MentorshipRequest;
import com.alumniportal.service.MentorshipRequestService;

@RestController
@RequestMapping("/request")
public class MentorshipRequestController {

    @Autowired
    private MentorshipRequestService service;

    @PostMapping
    public String sendRequest(

            @RequestHeader("Authorization")
            String authHeader,

            @RequestBody
            MentorshipRequestDto request) {

        return service.sendRequest(
                authHeader,
                request);
    }
    
    @GetMapping("/my")
    public List<MentorshipRequest> getMyRequests(
            @RequestHeader("Authorization")
            String authHeader) {

        return service.getMyRequests(authHeader);
    }
    @GetMapping("/received")
    public List<MentorshipRequest> getReceivedRequests(
            @RequestHeader("Authorization")
            String authHeader) {

        return service.getReceivedRequests(authHeader);
    }

    @PutMapping("/{id}/accept")
    public String acceptRequest(
            @PathVariable Long id) {

        return service.acceptRequest(id);
    }

    @PutMapping("/{id}/reject")
    public String rejectRequest(
            @PathVariable Long id) {

        return service.rejectRequest(id);
    }
    
    @GetMapping("/accepted")
    public List<MentorshipRequest> getAcceptedRequests(
            @RequestHeader("Authorization")
            String authHeader) {

        return service.getAcceptedRequests(authHeader);
    }
    
    
}
