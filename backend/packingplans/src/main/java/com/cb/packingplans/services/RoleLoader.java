package com.cb.packingplans.services;

import com.cb.packingplans.models.ERole;
import com.cb.packingplans.models.Role;
import com.cb.packingplans.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RoleLoader {
    private RoleRepository roleRepository;

    @Autowired
    public RoleLoader(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
        loadRoles();
    }

    private void loadRoles() {
        for (ERole role : ERole.values()) {
            try {
                roleRepository.findByName(role).orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            } catch (Exception e) {
                roleRepository.save(new Role(role));
            }
        }
    }
}
