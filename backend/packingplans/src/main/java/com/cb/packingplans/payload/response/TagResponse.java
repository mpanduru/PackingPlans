package com.cb.packingplans.payload.response;

import java.util.List;

public class TagResponse {

    private Long id;
    private String name;
    private List<String> locationNames;

    public TagResponse(Long id, String name, List<String> locationNames) {
        this.id = id;
        this.name = name;
        this.locationNames = locationNames;
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

    public List<String> getLocationNames() {
        return locationNames;
    }

    public void setLocationNames(List<String> locationNames) {
        this.locationNames = locationNames;
    }
}
