package com.cb.packingplans.controllers;

import com.cb.packingplans.converters.ActivityConverter;
import com.cb.packingplans.models.Activity;
import com.cb.packingplans.models.Trip;
import com.cb.packingplans.models.User;
import com.cb.packingplans.payload.request.ActivityRequest;
import com.cb.packingplans.payload.response.MessageResponse;
import com.cb.packingplans.repository.UserRepository;
import com.cb.packingplans.security.jwt.JwtUtils;
import com.cb.packingplans.services.ActivityService;
import com.cb.packingplans.services.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rest/activities")
public class ActivityController {

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ActivityService activityService;
    @Autowired
    private TripService tripService;

    @PostMapping("/new")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> addNewActivity(@RequestBody ActivityRequest activityRequest, @CookieValue("packingplanslogin") String jwtToken) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> user = userRepository.findByUsername(username);

        Trip trip = tripService.getTrip(activityRequest.getTripId());
        if (user.isPresent()) {
            try {
                if (activityRequest.getDay().isBefore(trip.getStartDate()) || activityRequest.getDay().isAfter(trip.getEndDate())) {
                    return ResponseEntity.badRequest().body(new MessageResponse("Activity day should be in the trip date interval!"));
                } else {
                    Activity activity = ActivityConverter.convertActivityRequestToActivity(activityRequest, tripService);
                    if (activity.getTrip().getUsers().contains(user.get())) {
                        if (activity.getTrip().getActivities().stream().noneMatch(existingActivity ->
                                isActivityTimeEqual(activity, existingActivity))) {
                            Activity newActivity = activityService.addActivity(activity);
                            return ResponseEntity.ok(ActivityConverter.convertActivityToActivityResponse(newActivity));
                        }
                        return ResponseEntity.badRequest().body(new MessageResponse("There are other activities already planned at this hour!"));
                    } else {
                        return ResponseEntity.badRequest().body(new MessageResponse("Error! You can not change other user's trips or activities"));
                    }
                }
            } catch (Exception e) {
                ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
    }

    boolean isActivityTimeEqual(Activity activity1, Activity activity2) {
        return activity1.getDay().equals(activity2.getDay()) && activity1.getStartTime().equals(activity2.getStartTime());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getActivityById(@PathVariable("id") Long id, @CookieValue("packingplanslogin") String jwtToken) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            Activity activity = activityService.getActivityById(id);
            if (activity.getTrip().getUsers().contains(user.get())) {
                return ResponseEntity.ok().body(ActivityConverter.convertActivityToActivityResponse(activity));
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Error! You can not see other user's trips or activities"));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> editActivity(@PathVariable("id") Long id, @RequestBody ActivityRequest activityRequest, @CookieValue("packingplanslogin") String jwtToken) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> user = userRepository.findByUsername(username);

        Trip trip = tripService.getTrip(activityRequest.getTripId());

        if (user.isPresent()) {
            try {
                if (activityRequest.getDay().isBefore(trip.getStartDate()) || activityRequest.getDay().isAfter(trip.getEndDate())) {
                    return ResponseEntity.badRequest().body(new MessageResponse("Activity day should be in the trip date interval!"));
                } else {
                    Activity activity = activityService.getActivityById(id);
                    Activity editedActivity = ActivityConverter.convertActivityRequestToActivity(activityRequest, tripService);
                    if (activity.getTrip().getUsers().contains(user.get())) {
                        if (activity.getTrip().getActivities().stream().noneMatch(existingActivity ->
                                isActivityTimeEqual(editedActivity, existingActivity))) {
                            Activity newActivity = activityService.editActivity(activity, activityRequest);
                            return ResponseEntity.ok(ActivityConverter.convertActivityToActivityResponse(newActivity));
                        }
                        return ResponseEntity.badRequest().body(new MessageResponse("There are other activities already planned at this hour!"));
                    } else {
                        return ResponseEntity.badRequest().body(new MessageResponse("Error! You can not change other user's trips or activities"));
                    }
                }
            } catch (Exception e) {
                ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
    }

}