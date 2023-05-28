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
    private String latitude;
    private String longitude;
    private String country;
    private String imageUrl;
    private String coverImageUrl;
    private List<String> tagNames;
}
