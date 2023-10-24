package com.example.kits2023_backend_v1.repository;


import com.example.kits2023_backend_v1.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.Select;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Integer> {

    @Query("SELECT a FROM Article a WHERE a.status=false ")
    List<Article> getListArticleToApproval();
    Optional<Article> findArticleById(int id);
    Optional<Article> findArticleByName(String name);
}
