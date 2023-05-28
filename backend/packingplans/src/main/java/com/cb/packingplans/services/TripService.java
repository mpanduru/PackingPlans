package com.cb.packingplans.services;

import com.cb.packingplans.models.Activity;
import com.cb.packingplans.models.Location;
import com.cb.packingplans.models.Trip;
import com.cb.packingplans.models.User;
import com.cb.packingplans.payload.request.TripRequest;
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
    @Autowired
    private LocationService locationService;

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

    public Trip updateTrip(Trip trip, TripRequest tripRequest) {
        Location location = locationService.findByName(tripRequest.getLocationName());
        trip.update(tripRequest.getStartDate(), tripRequest.getEndDate(), location);
        Trip newTrip = tripRepository.save(trip);
        return newTrip;
    }

    public void deleteTrip(Long tripId) {
        tripRepository.deleteById(tripId);
    }

    public void removeUser(Long tripId, Long userId) {
        tripRepository.removeUserFromTrip(tripId, userId);
    }

    public void addUserToTrip(Long tripId, Long userId) {
        tripRepository.addUserToTrip(tripId, userId);
    }
}
