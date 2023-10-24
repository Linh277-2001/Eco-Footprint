package com.example.kits2023_backend_v1.service;

import com.example.kits2023_backend_v1.model.Activity;
import com.example.kits2023_backend_v1.model.ActivityFootprint;
import com.example.kits2023_backend_v1.model.Footprint;
import com.example.kits2023_backend_v1.repository.FootprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class FootprintService {
    @Autowired
    private FootprintRepository footprintRepository;
    public void updateTotalEmission(int footprintId){
        Optional<Footprint> optionalFootprint=footprintRepository.findById(footprintId);
        if(optionalFootprint.isPresent()){
            Footprint footprint=optionalFootprint.get();
            double totalEmission= footprintRepository.getTotalEmission(footprintId);
            footprint.setTotalEmission(totalEmission);
            footprintRepository.save(footprint);
            }
        else {
            throw new IllegalArgumentException("Invalid footprint Id");
        }
    }
}