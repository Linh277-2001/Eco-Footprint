package com.example.kits2023_backend_v1.controller;

import com.example.kits2023_backend_v1.model.RegularActivity;
import com.example.kits2023_backend_v1.model.RegularActivityId;
import com.example.kits2023_backend_v1.repository.RegularActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/regularactivity")

public class RegularActivityController {
    @Autowired
    private RegularActivityRepository regularActivityRepository;
    @PostMapping
    public RegularActivity insertRegularActiviy(@RequestBody RegularActivity regularActivity){
        RegularActivityId id=new RegularActivityId(regularActivity.getId().getUserId(),regularActivity.getId().getActivityId());
        Optional<RegularActivity> updateRegularActivity=regularActivityRepository.findById(id);
        if(updateRegularActivity.isPresent()){
            return null;
        }
        return regularActivityRepository.save(regularActivity);
    }

    @DeleteMapping()
    public void deleteRegularActivity(@RequestParam int userId, int activityId){
        RegularActivityId id=new RegularActivityId(userId,activityId);
        regularActivityRepository.deleteById(id);
    }
    @GetMapping("/user/{userId}")
    public List<RegularActivity> list(@PathVariable int userId){
        return regularActivityRepository.findById_UserId(userId);
    }
}
