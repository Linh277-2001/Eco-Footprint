package com.example.kits2023_backend_v1.repository;


import com.example.kits2023_backend_v1.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {
    List<Activity> findByCategory_Id(int categoryId);
}
