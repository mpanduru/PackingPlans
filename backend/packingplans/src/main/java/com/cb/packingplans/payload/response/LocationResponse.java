package com.cb.packingplans.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class LocationResponse {

    private Long id;
    private String name;
    private String description;
    private String coordinates;
    private String country;
    private String imageUrl;
    private List<String> tagNames;
}
