package com.cb.packingplans.services;

import com.cb.packingplans.models.Trip;
import com.cb.packingplans.models.User;
import com.cb.packingplans.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    public Trip addTrip(Trip trip, User user) {
        trip.getUsers().add(user);
        Trip newTrip = tripRepository.save(trip);
        return newTrip;
    }
}