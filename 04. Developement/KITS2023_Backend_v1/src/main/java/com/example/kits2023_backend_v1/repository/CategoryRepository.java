package com.example.kits2023_backend_v1.repository;


import com.example.kits2023_backend_v1.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
