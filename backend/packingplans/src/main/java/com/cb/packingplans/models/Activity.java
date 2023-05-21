package com.cb.packingplans.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "activities")
@Getter
@Setter
@NoArgsConstructor
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;

    @NotNull
    private LocalTime startTime;

    @NotNull
    private LocalDate day;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    public Activity(Trip trip, String name, String description, LocalTime startTime, LocalDate day) {
        this.trip = trip;
        this.name = name;
        this.description = description;
        this.startTime = startTime;
        this.day = day;
    }
}
