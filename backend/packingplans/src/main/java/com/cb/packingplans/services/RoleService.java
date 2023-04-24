package com.cb.packingplans.services;

import com.cb.packingplans.models.ERole;
import com.cb.packingplans.models.Role;
import com.cb.packingplans.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Optional<Role> findByName(ERole name) {
        return roleRepository.findByName(name);
    }
}
