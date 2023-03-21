package com.olow.grpccms.grpccms.repository;

import com.olow.grpccms.grpccms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // create existsByEmail
    boolean existsByEmail(String email);
    // findByEmail optional
    Optional<User> findByEmail(String email);
}
