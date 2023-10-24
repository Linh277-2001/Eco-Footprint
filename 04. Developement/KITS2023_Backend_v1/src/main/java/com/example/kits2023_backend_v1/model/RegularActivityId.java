package com.example.kits2023_backend_v1.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegularActivityId implements Serializable {
    private int userId;
    private int activityId;
}