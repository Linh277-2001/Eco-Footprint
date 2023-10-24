package com.example.kits2023_backend_v1.repository;


import com.example.kits2023_backend_v1.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
    @Query("select u from Footprint f join f.user u where f.date=:date group by u order by f.totalEmission limit 3")
    List<User> getRank3User(@Param("date") String date);
    @Query("select count (u) from User u join u.roles r where r.name='ROLE_USER'")
    long countUser();
    @Query("select  (u) from User u join u.roles r where r.name='ROLE_USER'")
    List<User> getListUser();
}
