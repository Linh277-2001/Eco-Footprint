package com.example.kits2023_backend_v1.service;

import com.example.kits2023_backend_v1.model.ActivityFootprint;
import com.example.kits2023_backend_v1.model.ActivityFootprintId;
import com.example.kits2023_backend_v1.repository.ActivityFootprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ActivityFootprintService {
    @Autowired
    private ActivityFootprintRepository activityFootprintRepository;
    public ActivityFootprint insertActivityFootprint(ActivityFootprint activityFootprint){
        int activityId=activityFootprint.getId().getActivityId();
        int footprintId=activityFootprint.getId().getFootprintId();
        ActivityFootprintId id=new ActivityFootprintId(activityId,footprintId);
        Optional<ActivityFootprint> insertActivityFootPrint=activityFootprintRepository.findById(id);
        if(insertActivityFootPrint.isPresent()) return null;
        return activityFootprintRepository.save(activityFootprint);
    }
    public ActivityFootprint updateActivityFootprint(ActivityFootprint activityFootprint){
        int activityId=activityFootprint.getId().getActivityId();
        int footprintId=activityFootprint.getId().getFootprintId();
        ActivityFootprintId id=new ActivityFootprintId(activityId,footprintId);
        Optional<ActivityFootprint> updateActivityFootPrint=activityFootprintRepository.findById(id);
        if(updateActivityFootPrint.isPresent())  return activityFootprintRepository.save(activityFootprint);
        return null;
    }
    public Optional<ActivityFootprint> findById(int activityId, int footprintId){
        return activityFootprintRepository.findById_ActivityIdAndId_FootprintId(activityId,footprintId);
    }
}
