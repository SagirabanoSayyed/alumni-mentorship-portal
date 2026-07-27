package com.alumniportal.dto;

public class AlumniDashboardDto {
	
	private String fullName;
	private String email;
	private String role;

	private long assignedStudents;
	private long pendingRequests;
	private long acceptedRequests;
	private long upcomingSessions;
	private long completedSessions;
	private double averageRating;
	
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
	public long getAssignedStudents() {
		return assignedStudents;
	}
	public void setAssignedStudents(long assignedStudents) {
		this.assignedStudents = assignedStudents;
	}
	public long getPendingRequests() {
		return pendingRequests;
	}
	public void setPendingRequests(long pendingRequests) {
		this.pendingRequests = pendingRequests;
	}
	public long getAcceptedRequests() {
		return acceptedRequests;
	}
	public void setAcceptedRequests(long acceptedRequests) {
		this.acceptedRequests = acceptedRequests;
	}
	public long getUpcomingSessions() {
		return upcomingSessions;
	}
	public void setUpcomingSessions(long upcomingSessions) {
		this.upcomingSessions = upcomingSessions;
	}
	public long getCompletedSessions() {
		return completedSessions;
	}
	public void setCompletedSessions(long completedSessions) {
		this.completedSessions = completedSessions;
	}
	public double getAverageRating() {
		return averageRating;
	}
	public void setAverageRating(double averageRating) {
		this.averageRating = averageRating;
	}
	

}
