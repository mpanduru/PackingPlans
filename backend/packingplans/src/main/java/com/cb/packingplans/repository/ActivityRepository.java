package com.cb.packingplans.repository;

import com.cb.packingplans.models.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    Activity getActivityById(Long id);

    Set<Activity> findActivitiesByTripId(Long id);
}
