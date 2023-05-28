package com.cb.packingplans.services;

import com.cb.packingplans.exceptions.DuplicateLocationException;
import com.cb.packingplans.models.Location;
import com.cb.packingplans.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public Location addLocation(Location location) {
        if (locationRepository.existsByName(location.getName())) {
            throw new DuplicateLocationException("This location already exists");
        }

        Location newLocation = locationRepository.save(location);
        return newLocation;
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location findByName(String name) {
        return locationRepository.findByName(name);
    }

    public Optional<Location> getLocationById(Long id) {
        return locationRepository.findById(id);
    }

    public Location getLocationByName(String name) {
        return locationRepository.findByName(name);
    }
}
