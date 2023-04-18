package com.cb.packingplans.controllers;

import com.cb.packingplans.models.Location;
import com.cb.packingplans.payload.request.LocationRequest;
import com.cb.packingplans.payload.response.MessageResponse;
import com.cb.packingplans.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rest/location")
public class LocationController {

    @Autowired
    LocationRepository locationRepository;

    @PostMapping("/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addNewLocation(@RequestBody LocationRequest locationRequest) {
        if (locationRepository.existsByName(locationRequest.getName())) {
            return ResponseEntity.badRequest().body(new MessageResponse("This location already exists"));
        }
        Location location = new Location(locationRequest.getName(), locationRequest.getDescription(), locationRequest.getCoordinates(), locationRequest.getImageUrl());
        locationRepository.save(location);
        return ResponseEntity.ok().body(new MessageResponse("Location added successfully"));
    }
}
