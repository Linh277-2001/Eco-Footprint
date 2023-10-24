package com.example.kits2023_backend_v1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "footprints")
public class Footprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date date;
    private double totalEmission;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "activityfootprint",
            joinColumns = @JoinColumn(name = "footprintId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "activityId", referencedColumnName = "id")
    )
    private Set<Activity> activities;
}
