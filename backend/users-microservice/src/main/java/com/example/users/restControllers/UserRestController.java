package com.example.users.restControllers;

import com.example.users.entities.User;
import com.example.users.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController

public class UserRestController {

    @Autowired
    UserService userService;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @PostMapping("/signup")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        try {
            userService.saveUser(user);
            return ResponseEntity.ok(
                    new HashMap<>().put("message", "User created")
            );
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
