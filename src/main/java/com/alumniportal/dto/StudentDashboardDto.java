package com.alumniportal.dto;

public class StudentDashboardDto {

	private String fullName;
    private String email;
    private String role;
    private Long totalRequests;
    private Long acceptedRequests;
    private Long upcomingSessions;
    private Long completedSessions;
    private Long pendingRequests;
    
    public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	

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
    
    public Long getPendingRequests() {
        return pendingRequests;
    }

    public void setPendingRequests(Long pendingRequests) {
        this.pendingRequests = pendingRequests;
    }
}