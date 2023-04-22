package com.cb.packingplans.controllers;

import com.cb.packingplans.models.Location;
import com.cb.packingplans.models.Tag;
import com.cb.packingplans.payload.request.LocationRequest;
import com.cb.packingplans.payload.response.LocationResponse;
import com.cb.packingplans.payload.response.MessageResponse;
import com.cb.packingplans.repository.LocationRepository;
import com.cb.packingplans.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rest/locations")
public class LocationController {

    @Autowired
    LocationRepository locationRepository;
    @Autowired
    TagRepository tagRepository;

    @PostMapping("/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addNewLocation(@RequestBody LocationRequest locationRequest) {
        if (locationRepository.existsByName(locationRequest.getName())) {
            return ResponseEntity.badRequest().body(new MessageResponse("This location already exists"));
        }
        Location location = new Location(locationRequest.getName(), locationRequest.getDescription(), locationRequest.getCoordinates(), locationRequest.getImageUrl());
        Set<String> tagNames = locationRequest.getTagNames();
        Set<Tag> tags = new HashSet<>();
        if (tagNames != null) {
            tagNames.forEach(name -> {
                if (tagRepository.existsByName(name)) {
                    Tag tag = tagRepository.findByName(name);
                    tags.add(tag);
                }
            });
        }
        location.setTags(tags);
        locationRepository.save(location);
        return ResponseEntity.ok().body(new MessageResponse("Location added successfully"));
    }

    @GetMapping("/all")
    public ResponseEntity<?> seeAllLocations() {
        List<Location> locations = locationRepository.findAll();
        List<LocationResponse> locationResponseList = new ArrayList<>();
        locations.forEach(l -> {
            List<String> tagNames = l.getTags().stream()
                    .map(Tag::getName)
                    .collect(Collectors.toList());
            locationResponseList.add(
                    new LocationResponse(l.getId(), l.getName(), l.getDescription(), l.getCoordinates(), l.getImageUrl(), tagNames));
        });
        return ResponseEntity.ok().body(locationResponseList);
    }
}
