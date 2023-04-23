package com.cb.packingplans.converters;

import com.cb.packingplans.exceptions.LocationNotFoundException;
import com.cb.packingplans.models.Location;
import com.cb.packingplans.models.Trip;
import com.cb.packingplans.models.User;
import com.cb.packingplans.payload.request.TripRequest;
import com.cb.packingplans.payload.response.TripResponse;
import com.cb.packingplans.services.LocationService;

import java.util.List;

public class TripConverter {

    public static Trip convertTripRequestToTrip(TripRequest tripRequest, LocationService locationService) {
        Location location = locationService.findByName(tripRequest.getLocationName());
        if (location == null) {
            throw new LocationNotFoundException("This location does not exist!");
        }
        //to do verify if the exact same trip already exists for this user
        Trip trip = new Trip(tripRequest.getStartDate(), tripRequest.getEndDate(), location);
        return trip;
    }

    public static TripResponse convertTripToTripResponse(Trip trip) {
        List<String> userNames = trip.getUsers().stream()
                .map(User::getUsername).toList();
        return new TripResponse(trip.getId(), userNames, trip.getStartDate(), trip.getEndDate(), trip.getLocation().getName());
    }
}
