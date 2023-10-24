package com.example.kits2023_backend_v1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "articles", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name, featureImage;
    @Column(columnDefinition = "TEXT")
    private String content;
    @Column(columnDefinition = "boolean default false")
    private boolean status;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;
}
