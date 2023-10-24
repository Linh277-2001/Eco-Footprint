package com.example.kits2023_backend_v1.controller;

import com.example.kits2023_backend_v1.model.Activity;
import com.example.kits2023_backend_v1.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/activity")

public class ActivityController {
    @Autowired
    private ActivityRepository activityRepository;
    @GetMapping("/all")
    public List<Activity> getAll(){
        return activityRepository.findAll();
    }
    @PostMapping
    public Activity insertActivity(@RequestBody Activity activity){
        if(activityRepository.existsById(activity.getId())) return null;
        return activityRepository.save(activity);
    }
    @PutMapping("/update/{id}")
    public Activity updateActivity(@PathVariable int id,@RequestBody Activity activity){
        Optional<Activity> u=activityRepository.findById(id);
        if(u.isPresent()){
            Activity updateActivity=u.get();
            updateActivity.setName(activity.getName());
            updateActivity.setEmission(activity.getEmission());
            updateActivity.setDescription(activity.getDescription());
            updateActivity.setCategory(activity.getCategory());
            return activityRepository.save(updateActivity);
        }
        return null;
    }
    // get by
    @GetMapping("/category/{categoryId}")
    public List<Activity> getCategoryById(@PathVariable int categoryId){
        return activityRepository.findByCategory_Id(categoryId);
    }
    @GetMapping("/count")
    public long countAllActivity(){
        return activityRepository.count();
    }
//    @DeleteMapping("{id}")
//    public void DeleteActivity(@PathVariable int id){
//        Optional<Activity> a=activityRepository.findById(id);
//        if(a.isPresent()) {
//            activityRepository.delete(a.get());
//        }
//    }
}
