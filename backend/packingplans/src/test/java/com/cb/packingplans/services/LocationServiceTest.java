package com.cb.packingplans.services;

import com.cb.packingplans.exceptions.DuplicateLocationException;
import com.cb.packingplans.models.Location;
import com.cb.packingplans.repository.LocationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class LocationServiceTest {

    private final Location london = new Location("London", "description", "lat", "long", "UK", "image", "coverimage");
    @Mock
    private LocationRepository locationRepository;

    @InjectMocks
    private LocationService locationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("test that add location when location does not exists returns saved locations")
    void testAddLocationWhenLocationDoesNotExist() {
        when(locationRepository.existsByName(london.getName())).thenReturn(false);
        when(locationRepository.save(london)).thenReturn(london);

        Location savedLocation = locationService.addLocation(london);
        assertNotNull(savedLocation);
        assertEquals(london.getId(), savedLocation.getId());
        assertEquals(london.getName(), savedLocation.getName());
        verify(locationRepository, times(1)).existsByName(london.getName());
        verify(locationRepository, times(1)).save(london);
    }

    @Test
    @DisplayName("test that add location when location already exists throws DuplicateLocationException")
    void testAddLocationWhenLocationAlreadyExists() {
        when(locationRepository.existsByName(london.getName())).thenReturn(true);
        assertThrows(DuplicateLocationException.class, () -> locationService.addLocation(london));
        verify(locationRepository, times(1)).existsByName(london.getName());
        verify(locationRepository, never()).save(london);
    }

    @Test
    @DisplayName("test that get all locations should return a list of all locations")
    void testGetAllLocations() {
        List<Location> locations = new ArrayList<>();
        locations.add(london);
        locations.add(london);
        when(locationRepository.findAll()).thenReturn(locations);
        List<Location> result = locationService.getAllLocations();

        assertEquals(locations.size(), result.size());
        assertEquals(locations, result);
        verify(locationRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("test find by name when location exists")
    void testFindByName() {
        String name = "London";
        when(locationRepository.findByName(name)).thenReturn(london);
        Location result = locationService.findByName(name);

        assertNotNull(result);
        assertEquals(london.getId(), result.getId());
        assertEquals(london.getName(), result.getName());
        verify(locationRepository, times(1)).findByName(name);
    }

    @Test
    @DisplayName("test find by name when location does not exist")
    void testFindByNameWhenLocationDoesNotExist() {
        String name = "Non-existing Location";
        when(locationRepository.findByName(name)).thenReturn(null);
        Location result = locationService.findByName(name);
        assertNull(result);
        verify(locationRepository, times(1)).findByName(name);
    }

    @Test
    @DisplayName("test that get location by id returns optional of location")
    void testThatGetLocationByIdWhenLocationExistsShouldReturnOptionalLocation() {
        Long id = 1L;
        when(locationRepository.findById(id)).thenReturn(Optional.of(london));
        Optional<Location> result = locationService.getLocationById(id);
        assertTrue(result.isPresent());
        assertEquals(london.getId(), result.get().getId());
        assertEquals(london.getName(), result.get().getName());
        verify(locationRepository, times(1)).findById(id);
    }

    @Test
    void testThatGetLocationByIdWhenLocationDoesNotExistShouldReturnEmptyOptional() {
        Long id = 1L;
        when(locationRepository.findById(id)).thenReturn(Optional.empty());
        Optional<Location> result = locationService.getLocationById(id);
        assertFalse(result.isPresent());
        verify(locationRepository, times(1)).findById(id);
    }

    @Test
    void getLocationByNameWhenLocationDoesNotExistShouldReturnNull() {
        String name = "Non-existing Location";
        when(locationRepository.findByName(name)).thenReturn(null);
        Location result = locationService.getLocationByName(name);
        assertNull(result);
        verify(locationRepository, times(1)).findByName(name);
    }
}