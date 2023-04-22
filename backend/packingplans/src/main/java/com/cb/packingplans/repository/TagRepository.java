package com.cb.packingplans.repository;

import com.cb.packingplans.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);

    Boolean existsByName(String name);

    List<Tag> findAll();
}
