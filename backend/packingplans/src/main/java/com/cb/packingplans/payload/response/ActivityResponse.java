package com.cb.packingplans.payload.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
public class ActivityResponse {
    private Long id;
    private String name;
    private String description;
    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime startTime;
    private Long tripId;
}
