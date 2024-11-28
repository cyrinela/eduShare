package com.example.users.restControllers;
import com.example.users.entities.User;
import com.example.users.entities.UserDto;
import com.example.users.repos.UserRepository;
import com.example.users.service.AdminService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/admin/users")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserRepository userRepository;

   // Create a new user
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody UserDto userDto) {
        User user = adminService.createUser(userDto.getUsername(), userDto.getPassword(), userDto.getRoleIds());
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    // Get all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Get user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        User user = adminService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    // Update a user
    @PutMapping("/{userId}/update")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody UserDto userDto) {
        User updatedUser = adminService.updateUser(userId, userDto.getUsername(), userDto.getPassword(), userDto.getRoleIds());
        return ResponseEntity.ok(updatedUser);
    }

    // Delete a user
   /* @DeleteMapping("/{userId}/delete")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }*/
    // DELETE endpoint to delete a user by ID
    @Transactional
    @DeleteMapping("/{userId}/delete")
    public void deleteUser(Long userId) {
        // Check if the user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Remove the user's roles (avoid constraint issues)
        user.getRoles().clear();

        // Delete the user from the database
        userRepository.delete(user);
    }
}

