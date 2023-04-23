package com.cb.packingplans.converters;

import com.cb.packingplans.models.Location;
import com.cb.packingplans.models.Tag;
import com.cb.packingplans.payload.request.TagRequest;
import com.cb.packingplans.payload.response.TagResponse;

import java.util.List;
import java.util.stream.Collectors;

public class TagConverter {
    public static Tag convertTagRequestToTag(TagRequest tagRequest) {
        Tag tag = new Tag(tagRequest.getName());

        return tag;
    }

    public static TagResponse convertTagToTagResponse(Tag tag) {
        List<String> locationNames = tag.getLocations().stream()
                .map(Location::getName)
                .collect(Collectors.toList());
        return new TagResponse(tag.getId(), tag.getName(), locationNames);
    }
}
