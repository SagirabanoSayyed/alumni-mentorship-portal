package com.alumniportal.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumniportal.entity.User;
import com.alumniportal.enums.Role;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    
    long countByRole(Role role);
}