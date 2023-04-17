package com.cb.packingplans.controllers;

import com.cb.packingplans.models.Trip;
import com.cb.packingplans.models.User;
import com.cb.packingplans.payload.request.NewTripRequest;
import com.cb.packingplans.payload.response.MessageResponse;
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
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/new")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> addNewTrip(@RequestBody NewTripRequest newTripRequest, @CookieValue("packingplanslogin") String jwtToken) {
        if (newTripRequest.getStartDate().isAfter(newTripRequest.getEndDate())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Can not have start date after end date"));
        }
        String username = jwtUtils.getUserNameFromJwtToken(jwtToken);
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            Trip trip = new Trip(newTripRequest.getStartDate(), newTripRequest.getEndDate());
            trip.getUsers().add(userOptional.get());
            tripRepository.save(trip);
            return ResponseEntity.ok().body(new MessageResponse("Trip added successfully"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error"));
    }
}
