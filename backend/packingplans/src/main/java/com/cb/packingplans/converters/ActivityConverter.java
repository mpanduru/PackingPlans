package com.cb.packingplans.converters;

import com.cb.packingplans.exceptions.TripNotFoundException;
import com.cb.packingplans.models.Activity;
import com.cb.packingplans.models.Trip;
import com.cb.packingplans.payload.request.ActivityRequest;
import com.cb.packingplans.payload.response.ActivityResponse;
import com.cb.packingplans.services.TripService;

public class ActivityConverter {
    public static Activity convertActivityRequestToActivity(ActivityRequest activityRequest, TripService tripService) {
        Trip trip = tripService.getTrip(activityRequest.getTripId());
        if (trip == null) {
            throw new TripNotFoundException("This trip does not exist!");
        }
        Activity activity = new Activity(trip, activityRequest.getName(), activityRequest.getDescription(), activityRequest.getStartTime(), activityRequest.getDay());
        return activity;
    }

    public static ActivityResponse convertActivityToActivityResponse(Activity activity) {
        return new ActivityResponse(activity.getId(), activity.getName(), activity.getDescription(), activity.getStartTime(), activity.getDay(), activity.getTrip().getId());
    }
}
