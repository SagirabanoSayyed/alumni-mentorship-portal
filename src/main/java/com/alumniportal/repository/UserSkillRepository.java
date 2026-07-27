package com.alumniportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumniportal.entity.UserSkill;

public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {

    List<UserSkill> findByUserUserId(Long userId);

    List<UserSkill> findBySkillSkillNameContainingIgnoreCase(String skillName);

    boolean existsByUserUserIdAndSkillSkillId(Long userId, Long skillId);
    
    

}