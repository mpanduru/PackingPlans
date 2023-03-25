package com.cb.packingplans.payload.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter

public class SignupRequest {
    @NotBlank
    @Size(min = 3)
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String fullname;

    private Set<String> role;

    @NotBlank
    @Size(min = 8)
    private String password;
}
