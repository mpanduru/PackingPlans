package com.cb.packingplans.converters;

import com.cb.packingplans.models.ERole;
import com.cb.packingplans.models.Role;
import com.cb.packingplans.models.User;
import com.cb.packingplans.payload.request.SignupRequest;
import com.cb.packingplans.payload.response.UserInfoResponse;
import com.cb.packingplans.services.RoleService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class UserConverter {

    public static User convertSignUpRequestToUser(SignupRequest signUpRequest, PasswordEncoder encoder, RoleService roleService) {
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getFullname(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            roles.add(roleService.findByName(ERole.ROLE_USER).get());
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        roles.add(roleService.findByName(ERole.ROLE_ADMIN).get());
                        break;
                    default:
                        roles.add(roleService.findByName(ERole.ROLE_USER).get());
                }
            });
        }

        user.setRoles(roles);

        return user;
    }

    public static UserInfoResponse convertUserToUserInfoResponse(User user) {
        List<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .map(ERole::name).toList();
        return new UserInfoResponse(user.getId(), user.getUsername(), user.getEmail(), roles);
    }
}
