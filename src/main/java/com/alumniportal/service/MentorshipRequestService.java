package com.alumniportal.service;

import java.util.List;

import com.alumniportal.dto.MentorshipRequestDto;
import com.alumniportal.entity.MentorshipRequest;

public interface MentorshipRequestService {

    String sendRequest(
            String authHeader,
            MentorshipRequestDto request);
    
    List<MentorshipRequest> getReceivedRequests(String authHeader);

    String acceptRequest(Long requestId);

    String rejectRequest(Long requestId);
    
    List<MentorshipRequest> getMyRequests(String authHeader);
    
    List<MentorshipRequest>
    getAcceptedRequests(String authHeader);
    
    

}
