package com.cb.packingplans.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "locations")
@Getter
@Setter
@NoArgsConstructor
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    @Column(columnDefinition = "MEDIUMTEXT")
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
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Trip> trips = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "location_tag_bridge",
            joinColumns = @JoinColumn(name = "location_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new HashSet<>();

    public Location(String name, String description, String latitude, String longitude, String country, String imageUrl, String coverImageUrl) {
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.country = country;
        this.imageUrl = imageUrl;
        this.coverImageUrl = coverImageUrl;
    }
}
