package com.cb.packingplans.payload.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LocationResponse {

    private Long id;
    private String name;
    private String description;
    private String coordinates;
    private String imageUrl;
    private List<String> tagNames;

    public LocationResponse(Long id, String name, String description, String coordinates, String imageUrl, List<String> tagNames) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.coordinates = coordinates;
        this.imageUrl = imageUrl;
        this.tagNames = tagNames;
    }
}
