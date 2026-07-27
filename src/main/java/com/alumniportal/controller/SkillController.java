package com.alumniportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alumniportal.dto.SkillRequest;
import com.alumniportal.dto.SkillResponse;
import com.alumniportal.service.SkillService;

@RestController
@RequestMapping("/skills")
@CrossOrigin(origins = "http://localhost:5173")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // Add Skill
    @PostMapping("/add")
    public SkillResponse addSkill(@RequestBody SkillRequest request) {

        return skillService.addSkill(request);
    }

    @GetMapping("/my-skills")
    public List<SkillResponse> getMySkills() {

        return skillService.getMySkills();
    }

    // Search by skill name
    @GetMapping("/search/{skillName}")
    public List<SkillResponse> searchBySkill(@PathVariable String skillName) {

        return skillService.searchBySkill(skillName);
    }

    // Delete a user skill
    @DeleteMapping("/{userSkillId}")
    public String deleteSkill(@PathVariable Long userSkillId) {

        skillService.deleteSkill(userSkillId);

        return "Skill deleted successfully";
    }
}