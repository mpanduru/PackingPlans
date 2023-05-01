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
    private String coordinates;
    @NotBlank
    private String country;
    @NotBlank
    private String imageUrl;
    private Set<String> tagNames;
}
