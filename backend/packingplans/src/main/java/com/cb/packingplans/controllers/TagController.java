package com.cb.packingplans.controllers;

import com.cb.packingplans.models.Location;
import com.cb.packingplans.models.Tag;
import com.cb.packingplans.payload.request.TagRequest;
import com.cb.packingplans.payload.response.MessageResponse;
import com.cb.packingplans.payload.response.TagResponse;
import com.cb.packingplans.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rest/tags")
public class TagController {

    @Autowired
    TagRepository tagRepository;

    @PostMapping("/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addNewTag(@RequestBody TagRequest tagRequest) {
        if (tagRepository.existsByName(tagRequest.getName())) {
            return ResponseEntity.badRequest().body(new MessageResponse("This tag already exists"));
        }
        Tag tag = new Tag(tagRequest.getName());
        tagRepository.save(tag);
        return ResponseEntity.ok().body(new MessageResponse("Tag added successfully"));
    }

    @GetMapping("/all")
    public ResponseEntity<?> seeAllTags() {
        List<Tag> tags = tagRepository.findAll();
        List<TagResponse> tagResponseList = new ArrayList<>();
        tags.forEach(t -> {
            List<String> locationNames = t.getLocations().stream()
                    .map(Location::getName)
                    .collect(Collectors.toList());
            tagResponseList.add(
                    new TagResponse(t.getId(), t.getName(), locationNames));
        });
        return ResponseEntity.ok().body(tagResponseList);
    }
}
