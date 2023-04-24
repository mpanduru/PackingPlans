package com.cb.packingplans.controllers;

import com.cb.packingplans.converters.TagConverter;
import com.cb.packingplans.exceptions.DuplicateTagException;
import com.cb.packingplans.models.Tag;
import com.cb.packingplans.payload.request.TagRequest;
import com.cb.packingplans.payload.response.MessageResponse;
import com.cb.packingplans.payload.response.TagResponse;
import com.cb.packingplans.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rest/tags")
public class TagController {
    @Autowired
    private TagService tagService;

    @PostMapping("/new")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addNewTag(@RequestBody TagRequest tagRequest) {
        try {
            Tag tag = TagConverter.convertTagRequestToTag(tagRequest);
            Tag newTag = tagService.addTag(tag);
            return ResponseEntity.ok(newTag);
        } catch (DuplicateTagException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTags() {
        List<Tag> tags = tagService.getAllTags();
        List<TagResponse> tagResponseList = new ArrayList<>();
        tags.forEach(t -> {
            tagResponseList.add(TagConverter.convertTagToTagResponse(t));
        });
        return ResponseEntity.ok().body(tagResponseList);
    }
}
