package com.alumniportal.dto;

public class StudentDashboardDto {

    private Long totalRequests;
    private Long acceptedRequests;
    private Long upcomingSessions;
    private Long completedSessions;

    public Long getTotalRequests() {
        return totalRequests;
    }

    public void setTotalRequests(Long totalRequests) {
        this.totalRequests = totalRequests;
    }

    public Long getAcceptedRequests() {
        return acceptedRequests;
    }

    public void setAcceptedRequests(Long acceptedRequests) {
        this.acceptedRequests = acceptedRequests;
    }

    public Long getUpcomingSessions() {
        return upcomingSessions;
    }

    public void setUpcomingSessions(Long upcomingSessions) {
        this.upcomingSessions = upcomingSessions;
    }

    public Long getCompletedSessions() {
        return completedSessions;
    }

    public void setCompletedSessions(Long completedSessions) {
        this.completedSessions = completedSessions;
    }
}