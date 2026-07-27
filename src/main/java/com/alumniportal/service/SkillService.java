package com.alumniportal.service;

import java.util.List;

import com.alumniportal.dto.SkillRequest;
import com.alumniportal.dto.SkillResponse;

public interface SkillService {

    SkillResponse addSkill(SkillRequest request);

    List<SkillResponse> getMySkills();

    List<SkillResponse> searchBySkill(String skillName);

    void deleteSkill(Long userSkillId);

}