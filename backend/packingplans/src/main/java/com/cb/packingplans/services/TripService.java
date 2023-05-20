package com.cb.packingplans.services;

import com.cb.packingplans.models.Activity;
import com.cb.packingplans.models.Trip;
import com.cb.packingplans.models.User;
import com.cb.packingplans.repository.ActivityRepository;
import com.cb.packingplans.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;
    @Autowired
    private ActivityRepository activityRepository;

    public Trip addTrip(Trip trip, User user) {
        trip.getUsers().add(user);
        Trip newTrip = tripRepository.save(trip);
        return newTrip;
    }

    public Trip getTrip(Long tripID) {
        Trip searchedTrip = tripRepository.findTripById(tripID);
        return searchedTrip;
    }

    public Set<Trip> getAllTripsByUser(Long userId) {
        return tripRepository.findAllByUsers_Id(userId);
    }

    public Set<Activity> getAllActivitiesByTripId(Long id) {
        return activityRepository.findActivitiesByTripId(id);
    }
}
