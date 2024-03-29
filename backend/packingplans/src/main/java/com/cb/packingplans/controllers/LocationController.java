package com.cb.packingplans.controllers;

import com.cb.packingplans.converters.LocationConverter;
import com.cb.packingplans.exceptions.DuplicateLocationException;
import com.cb.packingplans.models.Location;
import com.cb.packingplans.payload.request.LocationRequest;
import com.cb.packingplans.payload.response.LocationResponse;
import com.cb.packingplans.payload.response.MessageResponse;
import com.cb.packingplans.services.LocationService;
import com.cb.packingplans.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rest/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;
    @Autowired
    private TagService tagService;

    @PostMapping("/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addNewLocation(@RequestBody LocationRequest locationRequest) {

        try {
            Location location = LocationConverter.convertLocationRequestToLocation(locationRequest, tagService);
            Location newLocation = locationService.addLocation(location);
            return ResponseEntity.ok(LocationConverter.convertLocationToLocationResponse(newLocation));
        } catch (DuplicateLocationException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllLocations() {
        List<Location> locations = locationService.getAllLocations();
        List<LocationResponse> locationResponseList = new ArrayList<>();
        locations.forEach(l -> {
            locationResponseList.add(
                    LocationConverter.convertLocationToLocationResponse(l));
        });
        return ResponseEntity.ok().body(locationResponseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLocationById(@PathVariable("id") Long id) {
        Optional<Location> location = locationService.getLocationById(id);
        if (location.isPresent())
            return ResponseEntity.ok(LocationConverter.convertLocationToLocationResponse(location.get()));
        return ResponseEntity.badRequest().body(new MessageResponse("Location not found!"));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<?> getLocationByName(@PathVariable("name") String name) {
        try {
            Location location = locationService.getLocationByName(name);
            return ResponseEntity.ok(LocationConverter.convertLocationToLocationResponse(location));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
