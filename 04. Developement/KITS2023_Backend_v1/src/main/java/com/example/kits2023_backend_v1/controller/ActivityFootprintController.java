package com.example.kits2023_backend_v1.controller;

import com.example.kits2023_backend_v1.model.ActivityFootprint;
import com.example.kits2023_backend_v1.service.ActivityFootprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/af")

public class ActivityFootprintController{
    @Autowired
    private ActivityFootprintService activityFootprintService;
    @GetMapping("/find/{activityId}/{footprintId}")
    public ResponseEntity<?> findByActivityAndFootprint(@PathVariable int activityId, @PathVariable int footprintId){
        Optional<ActivityFootprint> af=activityFootprintService.findById(activityId, footprintId);
        if(af.isPresent()) return ResponseEntity.ok().body(af.get());
        return ResponseEntity.ok().body(null);
    }

    @PostMapping
    public ActivityFootprint insertActivityFootprint(@RequestBody ActivityFootprint activityFootprint){
        return activityFootprintService.insertActivityFootprint(activityFootprint);
    }
    @PutMapping
    public ActivityFootprint updateActivityFootprint(@RequestBody ActivityFootprint activityFootprint){
        return activityFootprintService.updateActivityFootprint(activityFootprint);
    }
}
