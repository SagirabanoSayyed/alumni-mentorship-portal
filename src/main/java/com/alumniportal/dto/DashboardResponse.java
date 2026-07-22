package com.alumniportal.dto;

public class DashboardResponse {

    private String fullName;
    private String email;
    private String role;

    public DashboardResponse(String fullName,
                             String email,
                             String role) {
        this.fullName = fullName;
        this.email = email;
        this.role = role;
    }

    
	public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}
