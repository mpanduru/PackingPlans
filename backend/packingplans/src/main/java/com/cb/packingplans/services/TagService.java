package com.cb.packingplans.services;

import com.cb.packingplans.exceptions.DuplicateTagException;
import com.cb.packingplans.models.Tag;
import com.cb.packingplans.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public Tag addTag(Tag tag) {
        if (tagRepository.existsByName(tag.getName())) {
            throw new DuplicateTagException("This tag already exists");
        }
        Tag newTag = tagRepository.save(tag);
        return newTag;
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public boolean existsByName(String name) {
        return tagRepository.existsByName(name);
    }

    public Tag findByName(String name) {
        return tagRepository.findByName(name);
    }
}
