package com.cb.packingplans.repository;

import com.cb.packingplans.models.Trip;
import com.cb.packingplans.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface TripRepository extends JpaRepository<Trip, Long> {
    Set<Trip> findAllByUsers_Id(Long userId);

    Set<User> findUsersById(Long tripId);
}
