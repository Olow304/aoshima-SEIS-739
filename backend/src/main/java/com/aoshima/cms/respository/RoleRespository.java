package com.aoshima.cms.respository;

import com.aoshima.cms.models.RoleClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRespository extends JpaRepository<RoleClass, Long> {
    Optional<RoleClass> findByName(String name);
}
