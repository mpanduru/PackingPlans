package com.cb.packingplans.controllers;

import com.cb.packingplans.models.Location;
import com.cb.packingplans.payload.request.LocationRequest;
import com.cb.packingplans.payload.response.LocationResponse;
import com.cb.packingplans.payload.response.MessageResponse;
import com.cb.packingplans.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rest/locations")
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

    @GetMapping("/all")
    public ResponseEntity<?> seeAllLocations() {
        List<Location> locations = locationRepository.findAll();
        List<LocationResponse> locationResponseList = new ArrayList<>();
        locations.stream()
                .forEach(l -> locationResponseList.add(
                        new LocationResponse(l.getId(), l.getName(), l.getDescription(), l.getCoordinates(), l.getImageUrl())));
        return ResponseEntity.ok().body(locationResponseList);
    }
}
