package com.cb.packingplans.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class LocationRequest {

    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotBlank
    private String latitude;
    @NotBlank
    private String longitude;
    @NotBlank
    private String country;
    @NotBlank
    private String imageUrl;
    @NotBlank
    private String coverImageUrl;
    private Set<String> tagNames;
}
