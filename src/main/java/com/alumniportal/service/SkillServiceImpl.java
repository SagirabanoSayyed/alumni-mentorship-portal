package com.alumniportal.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumniportal.dto.SkillRequest;
import com.alumniportal.dto.SkillResponse;
import com.alumniportal.entity.Skill;
import com.alumniportal.entity.User;
import com.alumniportal.entity.UserSkill;
import com.alumniportal.repository.SkillRepository;
import com.alumniportal.repository.UserRepository;
import com.alumniportal.repository.UserSkillRepository;
import com.alumniportal.service.SkillService;
import java.util.Optional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    @Override
    public SkillResponse addSkill(SkillRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return null;
        }

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
            return null;
        }

        boolean exists =
                userSkillRepository.existsByUserUserIdAndSkillSkillId(
                        user.getUserId(),
                        skill.getSkillId());

        if (exists) {
            return null;
        }

        UserSkill userSkill = new UserSkill();

        userSkill.setUser(user);
        userSkill.setSkill(skill);

        userSkillRepository.save(userSkill);

        SkillResponse response = new SkillResponse();

        response.setSkillId(skill.getSkillId());
        response.setSkillName(skill.getSkillName());

        return response;
    }

	@Override
	public void deleteSkill(Long userSkillId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<SkillResponse> getSkillsByUser(Long userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SkillResponse> searchBySkill(String skillName) {
		// TODO Auto-generated method stub
		return null;
	}

}