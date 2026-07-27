package com.alumniportal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumniportal.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findBySkillNameIgnoreCase(String skillName);

}