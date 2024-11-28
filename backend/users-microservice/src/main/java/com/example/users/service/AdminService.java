package com.example.users.service;
import com.example.users.entities.Role;
import com.example.users.entities.User;
import com.example.users.repos.RoleRepository;
import com.example.users.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    // Create a new user
    public User createUser(String username, String password, List<Long> roleIds) {
        // Check if the username already exists
        User existingUser = userRepository.findByUsername(username);
        if (existingUser != null) {
            throw new RuntimeException("Username already exists");
        }

        // Find roles by role IDs
        List<Role> roles = roleRepository.findAllById(roleIds);

        // Create the new user
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);  // You should encrypt the password!
        user.setRoles(roles);

        return userRepository.save(user);
    }



    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Update a user
    @Transactional
    public User updateUser(Long userId, String username, String password, List<Long> roleIds) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update user details
        user.setUsername(username);
        user.setPassword(password); // Encrypt password here
        List<Role> roles = roleRepository.findAllById(roleIds);
        user.setRoles(roles);

        return userRepository.save(user);
    }

    // Delete a user
    @Transactional
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(userId);
    }
}



