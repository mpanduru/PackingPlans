package com.cb.packingplans.repository;

import com.cb.packingplans.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Location findByName(String name);

    Boolean existsByName(String name);

    List<Location> findAll();
}
