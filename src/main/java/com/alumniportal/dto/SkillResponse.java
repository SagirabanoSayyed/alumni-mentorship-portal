package com.alumniportal.dto;

public class SkillResponse {

    private Long id;
    private Long skillId;
    private String skillName;

    public SkillResponse() {
    }

    public SkillResponse(Long id, Long skillId, String skillName) {
        this.id = id;
        this.skillId = skillId;
        this.skillName = skillName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
}