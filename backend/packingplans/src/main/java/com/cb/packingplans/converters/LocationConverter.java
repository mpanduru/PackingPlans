package com.cb.packingplans.converters;

import com.cb.packingplans.models.Location;
import com.cb.packingplans.models.Tag;
import com.cb.packingplans.payload.request.LocationRequest;
import com.cb.packingplans.payload.response.LocationResponse;
import com.cb.packingplans.services.TagService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class LocationConverter {
    public static Location convertLocationRequestToLocation(LocationRequest locationRequest, TagService tagService) {
        Location location = new Location(locationRequest.getName(), locationRequest.getDescription(), locationRequest.getLatitude(), locationRequest.getLongitude(), locationRequest.getCountry(), locationRequest.getImageUrl(), locationRequest.getCoverImageUrl());
        Set<String> tagNames = locationRequest.getTagNames();
        Set<Tag> tags = new HashSet<>();
        if (tagNames != null) {
            tagNames.forEach(name -> {
                if (tagService.existsByName(name)) {
                    Tag tag = tagService.findByName(name);
                    tags.add(tag);
                }
            });
        }

        location.setTags(tags);

        return location;
    }

    public static LocationResponse convertLocationToLocationResponse(Location location) {
        List<String> tagNames = location.getTags().stream()
                .map(Tag::getName).toList();
        return new LocationResponse(location.getId(), location.getName(), location.getDescription(), location.getLatitude(), location.getLongitude(), location.getCountry(), location.getImageUrl(), location.getCoverImageUrl(), tagNames);
    }
}
