package com.cb.packingplans.repository;

import com.cb.packingplans.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

public interface TripRepository extends JpaRepository<Trip, Long> {
    Set<Trip> findAllByUsers_Id(Long userId);

    Trip findTripById(Long tripId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM user_trip_bridge WHERE trip_id = :tripId AND user_id = :userId", nativeQuery = true)
    void removeUserFromTrip(@Param("tripId") Long tripId, @Param("userId") Long userId);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO user_trip_bridge (user_id, trip_id) VALUES (:userId, :tripId)", nativeQuery = true)
    void addUserToTrip(@Param("tripId") Long tripId, @Param("userId") Long userId);
}
