package com.alumniportal.dto;

import jakarta.validation.constraints.NotBlank;

public class SkillRequest {

    @NotBlank(message = "Skill name is required")
    private String skillName;

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
}