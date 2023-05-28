package com.cb.packingplans.controllers;

import com.cb.packingplans.converters.ActivityConverter;
import com.cb.packingplans.converters.TripConverter;
import com.cb.packingplans.models.Activity;
import com.cb.packingplans.models.Trip;
import com.cb.packingplans.models.User;
import com.cb.packingplans.payload.request.TripRequest;
import com.cb.packingplans.payload.response.ActivityResponse;
import com.cb.packingplans.payload.response.MessageResponse;
import com.cb.packingplans.payload.response.TripResponse;
import com.cb.packingplans.repository.UserRepository;
import com.cb.packingplans.security.jwt.JwtUtils;
import com.cb.packingplans.services.LocationService;
import com.cb.packingplans.services.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rest/trips")
public class TripController {

    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TripService tripService;
    @Autowired
    private LocationService locationService;

    @PostMapping("/new")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> addNewTrip(@RequestBody TripRequest tripRequest, @CookieValue("packingplanslogin") String jwtToken) {
        if (tripRequest.getStartDate().isAfter(tripRequest.getEndDate())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Can not have start date after end date"));
        }

        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            try {
                Trip trip = TripConverter.convertTripRequestToTrip(tripRequest, locationService);
                if (user.get().getTrips().stream().allMatch(existingTrip ->
                        trip.getStartDate().isAfter(existingTrip.getEndDate())
                                || trip.getEndDate().isBefore(existingTrip.getStartDate()))) {
                    Trip newTrip = tripService.addTrip(trip, user.get());
                    return ResponseEntity.ok(TripConverter.convertTripToTripResponse(newTrip));
                } else {
                    return ResponseEntity.badRequest().body(new MessageResponse("You already have a trip planned in this interval!"));
                }
            } catch (Exception e) {
                ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getAllUserTrips(@CookieValue("packingplanslogin") String jwtToken) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            Set<Trip> trips = tripService.getAllTripsByUser(user.get().getId());
            List<TripResponse> tripResponseList = new ArrayList<>();
            trips.forEach(t -> {
                tripResponseList.add(
                        TripConverter.convertTripToTripResponse(t)
                );
            });
            //TODO sort activities before sending response
            return ResponseEntity.ok().body(tripResponseList);
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getTripById(@PathVariable("id") Long id, @CookieValue("packingplanslogin") String jwtToken) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            Trip trip = tripService.getTrip(id);
            if (trip.getUsers().contains(user.get())) {
                return ResponseEntity.ok().body(TripConverter.convertTripToTripResponse(trip));
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Error! You can not see other user's trips or activities"));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
    }

    @GetMapping("activities/{tripId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getActivitiesByTripId(@PathVariable("tripId") Long id, @CookieValue("packingplanslogin") String jwtToken) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            Trip trip = tripService.getTrip(id);
            if (trip.getUsers().contains(user.get())) {
                Set<Activity> activities = tripService.getAllActivitiesByTripId(id);
                List<ActivityResponse> activityResponseList = new ArrayList<>();
                activities.forEach(a -> {
                    activityResponseList.add(
                            ActivityConverter.convertActivityToActivityResponse(a)
                    );
                });

                return ResponseEntity.ok().body(activityResponseList);
            } else {
                return ResponseEntity.badRequest().body(new MessageResponse("Error! You can not see other user's trips or activities"));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> editTrip(@PathVariable("id") Long id, @RequestBody TripRequest tripRequest, @CookieValue("packingplanslogin") String jwtToken) {
        if (tripRequest.getStartDate().isAfter(tripRequest.getEndDate())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Can not have start date after end date"));
        }

        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            try {
                Trip trip = tripService.getTrip(id);
                if (trip.getUsers().contains(user.get())) {
                    if (user.get().getTrips().stream().filter(t -> !t.getId().equals(trip.getId())).allMatch(existingTrip ->
                            tripRequest.getStartDate().isAfter(existingTrip.getEndDate())
                                    || tripRequest.getEndDate().isBefore(existingTrip.getStartDate()))) {
                        Trip newTrip = tripService.updateTrip(trip, tripRequest);
                        return ResponseEntity.ok(TripConverter.convertTripToTripResponse(newTrip));
                    } else {
                        return ResponseEntity.badRequest().body(new MessageResponse("You already have a trip planned in this interval!"));
                    }
                } else {
                    return ResponseEntity.badRequest().body(new MessageResponse("Error! You can not edit other user's trips or activities"));
                }
            } catch (Exception e) {
                ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteTrip(@PathVariable("id") Long id, @CookieValue("packingplanslogin") String jwtToken) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            try {
                Trip trip = tripService.getTrip(id);
                int usersSize = trip.getUsers().size();
                if (trip.getUsers().contains(user.get())) {
                    if (usersSize == 1) {
                        tripService.deleteTrip(id);
                    } else if (usersSize > 1) {
                        tripService.removeUser(trip.getId(), user.get().getId());
                    }
                    return ResponseEntity.ok(new MessageResponse("Successfully deleted trip with id" + id));
                } else {
                    return ResponseEntity.badRequest().body(new MessageResponse("Error! You can not delete other user's trips or activities"));
                }

            } catch (Exception e) {
                return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
    }

    @PostMapping("/{tripId}/user/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> addUserToTrip(@PathVariable("tripId") Long tripId, @PathVariable("userId") Long userId, @CookieValue("packingplanslogin") String jwtToken) {
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            try {
                Trip trip = tripService.getTrip(tripId);
                if (trip.getUsers().contains(user.get())) {
                    tripService.addUserToTrip(trip.getId(), userId);
                    return ResponseEntity.ok(new MessageResponse("User successfully added to trip with id" + tripId));
                } else {
                    return ResponseEntity.badRequest().body(new MessageResponse("Error! You can not change other user's trips or activities"));
                }

            } catch (Exception e) {
                return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
    }
}
