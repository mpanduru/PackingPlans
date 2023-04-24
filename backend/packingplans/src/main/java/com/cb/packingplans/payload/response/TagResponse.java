package com.cb.packingplans.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TagResponse {

    private Long id;
    private String name;
    private List<String> locationNames;
}
