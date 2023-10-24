package com.example.kits2023_backend_v1.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityFootprintId implements Serializable {
    private int activityId;
    private int footprintId;
}
