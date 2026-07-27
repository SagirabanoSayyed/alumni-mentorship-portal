package com.alumniportal.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;

@Entity
@Table(name = "mentorship_sessions")
public class MentorshipSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private User mentor;

    @ManyToOne
    @JoinColumn(name = "request_id")
    private MentorshipRequest request;

    private LocalDate sessionDate;

    private LocalTime sessionTime;

    private String meetingLink;

    private String status;

    @Transient
    private boolean feedbackSubmitted;
    
    public MentorshipSession() {
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public User getMentor() {
        return mentor;
    }

    public void setMentor(User mentor) {
        this.mentor = mentor;
    }

    public MentorshipRequest getRequest() {
        return request;
    }

    public void setRequest(MentorshipRequest request) {
        this.request = request;
    }

    public LocalDate getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(LocalDate sessionDate) {
        this.sessionDate = sessionDate;
    }

    public LocalTime getSessionTime() {
        return sessionTime;
    }

    public void setSessionTime(LocalTime sessionTime) {
        this.sessionTime = sessionTime;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    public boolean isFeedbackSubmitted() {
        return feedbackSubmitted;
    }

    public void setFeedbackSubmitted(boolean feedbackSubmitted) {
        this.feedbackSubmitted = feedbackSubmitted;
    }
}