package com.example.kits2023_backend_v1.repository;


import com.example.kits2023_backend_v1.model.ERole;
import com.example.kits2023_backend_v1.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
