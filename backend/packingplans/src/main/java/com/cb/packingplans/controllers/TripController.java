package com.cb.packingplans.controllers;

import com.cb.packingplans.models.Location;
import com.cb.packingplans.models.Trip;
import com.cb.packingplans.models.User;
import com.cb.packingplans.payload.request.TripRequest;
import com.cb.packingplans.payload.response.MessageResponse;
import com.cb.packingplans.repository.LocationRepository;
import com.cb.packingplans.repository.TripRepository;
import com.cb.packingplans.repository.UserRepository;
import com.cb.packingplans.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rest/trips")
public class TripController {

    @Autowired
    TripRepository tripRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/new")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> addNewTrip(@RequestBody TripRequest tripRequest, @CookieValue("packingplanslogin") String jwtToken) {
        if (tripRequest.getStartDate().isAfter(tripRequest.getEndDate())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Can not have start date after end date"));
        }
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            Location location = locationRepository.findByName(tripRequest.getLocationName());
            if (location == null) {
                return ResponseEntity.badRequest().body(new MessageResponse("This location does not exist!"));
            }
            //to do verify if the exact same trip already exists for this user
            Trip trip = new Trip(tripRequest.getStartDate(), tripRequest.getEndDate(), location);
            trip.getUsers().add(user.get());
            tripRepository.save(trip);
            return ResponseEntity.ok().body(new MessageResponse("Trip added successfully"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error"));
    }
}
