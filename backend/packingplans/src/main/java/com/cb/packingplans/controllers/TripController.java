package com.cb.packingplans.controllers;

import com.cb.packingplans.converters.TripConverter;
import com.cb.packingplans.models.Trip;
import com.cb.packingplans.models.User;
import com.cb.packingplans.payload.request.TripRequest;
import com.cb.packingplans.payload.response.MessageResponse;
import com.cb.packingplans.repository.UserRepository;
import com.cb.packingplans.security.jwt.JwtUtils;
import com.cb.packingplans.services.LocationService;
import com.cb.packingplans.services.TripService;
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
                Trip newTrip = tripService.addTrip(trip, user.get());
                return ResponseEntity.ok(TripConverter.convertTripToTripResponse(newTrip));
            } catch (Exception e) {
                ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
            }
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Error! Could not retrieve user data"));
    }
}
