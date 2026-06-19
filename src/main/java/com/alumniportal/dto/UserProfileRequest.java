package com.alumniportal.dto;

public class UserProfileRequest {
	
	    private Long userId;
	    
	    private String aboutMe;

	    private String company;

	    private String designation;

	    private String industry;

	    private Integer graduationYear;
	    
		private String linkedinUrl;

	    private String githubUrl;

	    private String resumeUrl;

	    private String profilePicture;

	    public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
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

		

	    public UserProfileRequest() {
	    }

}
