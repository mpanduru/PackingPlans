package com.cb.packingplans.services;

import com.cb.packingplans.models.Activity;
import com.cb.packingplans.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public Activity addActivity(Activity activity) {
        Activity newActivity = activityRepository.save(activity);
        return newActivity;
    }

    public Activity getActivityById(Long id) {
        return activityRepository.getActivityById(id);
    }
}
