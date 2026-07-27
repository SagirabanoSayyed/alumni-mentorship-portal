package com.alumniportal.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.alumniportal.dto.SkillRequest;
import com.alumniportal.dto.SkillResponse;
import com.alumniportal.entity.Skill;
import com.alumniportal.entity.User;
import com.alumniportal.entity.UserSkill;
import com.alumniportal.repository.SkillRepository;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.repository.UserSkillRepository;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public SkillResponse addSkill(SkillRequest request) {

        User user = getCurrentUser();

        String skillName = request.getSkillName().trim();

        Optional<Skill> existingSkill =
                skillRepository.findBySkillNameIgnoreCase(skillName);

        Skill skill;

        if (existingSkill.isPresent()) {

            skill = existingSkill.get();

        } else {

            skill = new Skill();
            skill.setSkillName(skillName);

            skill = skillRepository.save(skill);
        }

        List<UserSkill> userSkills =
                userSkillRepository.findByUserUserId(user.getUserId());

        if (userSkills.size() >= 10) {
            throw new RuntimeException("Maximum 10 skills allowed");
        }

        boolean exists =
                userSkillRepository.existsByUserUserIdAndSkillSkillId(
                        user.getUserId(),
                        skill.getSkillId());

        if (exists) {
            throw new RuntimeException("Skill already added");
        }

        UserSkill userSkill = new UserSkill();

        userSkill.setUser(user);
        userSkill.setSkill(skill);

        // Save and get the generated ID
        userSkill = userSkillRepository.save(userSkill);

        SkillResponse response = new SkillResponse();

        response.setId(userSkill.getId());
        response.setSkillId(skill.getSkillId());
        response.setSkillName(skill.getSkillName());

        return response;

      
    }

    @Override
    public List<SkillResponse> getMySkills() {

        User user = getCurrentUser();

        List<UserSkill> userSkills =
                userSkillRepository.findByUserUserId(user.getUserId());

        return userSkills.stream().map(userSkill -> {

            SkillResponse response = new SkillResponse();
            response.setId(userSkill.getId());
            response.setSkillId(userSkill.getSkill().getSkillId());
            response.setSkillName(userSkill.getSkill().getSkillName());

            return response;

        }).collect(Collectors.toList());
    }

    @Override
    public List<SkillResponse> searchBySkill(String skillName) {

        List<UserSkill> userSkills =
                userSkillRepository
                        .findBySkillSkillNameContainingIgnoreCase(skillName);

        return userSkills.stream().map(userSkill -> {

            SkillResponse response = new SkillResponse();
            response.setId(userSkill.getId());
            response.setSkillId(userSkill.getSkill().getSkillId());
            response.setSkillName(userSkill.getSkill().getSkillName());
            return response;

        }).collect(Collectors.toList());
    }

    @Override
    public void deleteSkill(Long id) {

        User user = getCurrentUser();

        UserSkill userSkill = userSkillRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Skill not found"));

        if (!userSkill.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("You are not authorized to delete this skill");
        }

        userSkillRepository.delete(userSkill);
    }
}