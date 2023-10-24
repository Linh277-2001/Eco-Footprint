package com.example.kits2023_backend_v1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, unique = true)
    private String name;
    private String description;
    private String unit;
    @Column(name = "maxvolumn")
    private double maxvolumn;
    @Column(nullable = false)
    private double emission;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            name = "categoryId",
            referencedColumnName = "id"
    )
    private Category category;
}
