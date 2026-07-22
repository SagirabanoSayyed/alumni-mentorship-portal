package com.alumniportal.service;

import java.util.List;

import com.alumniportal.dto.SessionFeedbackDto;
import com.alumniportal.entity.SessionFeedback;

public interface SessionFeedbackService {

    String submitFeedback(
            String authHeader,
            SessionFeedbackDto dto);

    List<SessionFeedback>
            getMyFeedbacks(
                    String authHeader);
    
    List<SessionFeedback>
    getReceivedFeedbacks(
            String authHeader);
}