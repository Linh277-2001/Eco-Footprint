package com.example.kits2023_backend_v1.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "activityfootprint")
public class ActivityFootprint {
    @EmbeddedId
    private ActivityFootprintId id;
    private double volumn;


}
