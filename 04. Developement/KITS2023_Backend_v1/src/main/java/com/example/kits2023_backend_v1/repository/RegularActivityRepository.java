package com.example.kits2023_backend_v1.repository;

import com.example.kits2023_backend_v1.model.RegularActivity;
import com.example.kits2023_backend_v1.model.RegularActivityId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegularActivityRepository extends JpaRepository<RegularActivity, RegularActivityId> {
    public List<RegularActivity> findById_UserId(int userId);
}
