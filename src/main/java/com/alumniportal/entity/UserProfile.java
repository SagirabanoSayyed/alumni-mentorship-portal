package com.alumniportal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;

	@OneToOne
	@JoinColumn(name = "user_id", unique = true)
    private User user;

	private String aboutMe;
    
	private String company;
	
	private String designation;
	
	private String industry;
	
	private Integer graduationYear;
	
	private String linkedinUrl;

    private String githubUrl;

    private String resumeUrl;

    private String profilePicture;
    
    
    public UserProfile() {
    }
    
    public UserProfile(Long profileId, User user, String aboutMe, String company, String designation, String industry,
			Integer graduationYear, String linkedinUrl, String githubUrl, String resumeUrl, String profilePicture) {
		super();
		this.profileId = profileId;
		this.user = user;
		this.aboutMe = aboutMe;
		this.company = company;
		this.designation = designation;
		this.industry = industry;
		this.graduationYear = graduationYear;
		this.linkedinUrl = linkedinUrl;
		this.githubUrl = githubUrl;
		this.resumeUrl = resumeUrl;
		this.profilePicture = profilePicture;
	}
    
    public Long getProfileId() {
		return profileId;
	}

	public void setProfileId(Long profileId) {
		this.profileId = profileId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getAboutMe() {
		return aboutMe;
	}

	public void setAboutMe(String aboutMe) {
		this.aboutMe = aboutMe;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public Integer getGraduationYear() {
		return graduationYear;
	}

	public void setGraduationYear(Integer graduationYear) {
		this.graduationYear = graduationYear;
	}
	public String getLinkedinUrl() {
		return linkedinUrl;
	}

	public void setLinkedinUrl(String linkedinUrl) {
		this.linkedinUrl = linkedinUrl;
	}

	public String getGithubUrl() {
		return githubUrl;
	}

	public void setGithubUrl(String githubUrl) {
		this.githubUrl = githubUrl;
	}

	public String getResumeUrl() {
		return resumeUrl;
	}

	public void setResumeUrl(String resumeUrl) {
		this.resumeUrl = resumeUrl;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}
	
	@Override
	public String toString() {
	    return "UserProfile [profileId=" + profileId +
	           ", aboutMe=" + aboutMe +
	           ", linkedinUrl=" + linkedinUrl +
	           ", githubUrl=" + githubUrl + "]";
	}

}
