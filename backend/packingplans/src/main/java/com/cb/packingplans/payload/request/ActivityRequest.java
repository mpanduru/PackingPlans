package com.cb.packingplans.payload.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class ActivityRequest {
    @NotBlank
    private String name;
    @NotBlank
    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;
    @NotNull
    @JsonFormat(pattern = "HH:mm:ss.SSSD")
    private LocalTime startTime;
    @NotNull
    private Long tripId;
}