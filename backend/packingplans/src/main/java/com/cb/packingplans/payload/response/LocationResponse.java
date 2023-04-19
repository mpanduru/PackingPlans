package com.cb.packingplans.payload.response;

public class LocationResponse {

    private Long id;
    private String name;
    private String description;
    private String coordinates;
    private String imageUrl;

    public LocationResponse(Long id, String name, String description, String coordinates, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.coordinates = coordinates;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(String coordinates) {
        this.coordinates = coordinates;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
