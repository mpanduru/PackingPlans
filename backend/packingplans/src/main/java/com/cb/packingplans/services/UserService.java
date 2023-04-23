package com.cb.packingplans.services;

import com.cb.packingplans.exceptions.RegisterException;
import com.cb.packingplans.models.User;
import com.cb.packingplans.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RegisterException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RegisterException("Error: Email is already in use!");
        }

        User newUser = userRepository.save(user);

        return newUser;
    }


}
