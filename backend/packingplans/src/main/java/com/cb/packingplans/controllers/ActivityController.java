package com.cb.packingplans.controllers;

import com.cb.packingplans.converters.ActivityConverter;
import com.cb.packingplans.models.Activity;
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
        if (user.isPresent()) {
            try {
                Activity activity = ActivityConverter.convertActivityRequestToActivity(activityRequest, tripService);
                if (activity.getTrip().getUsers().contains(user.get())) {
                    if (activity.getTrip().getActivities().stream().noneMatch(existingActivity ->
                            activity.getStartTime().equals(existingActivity.getStartTime()))) {
                        Activity newActivity = activityService.addActivity(activity);
                        return ResponseEntity.ok(ActivityConverter.convertActivityToActivityResponse(newActivity));
                    }
                    return ResponseEntity.badRequest().body(new MessageResponse("There are other activities already planned at this hour!"));
                } else {
                    return ResponseEntity.badRequest().body(new MessageResponse("Error! You can not change other user's trips or activities"));
                }
            } catch (Exception e) {
                ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
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
}
