package com.example.users.security;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class AuthController {

    @GetMapping("/adminonly")
    @PreAuthorize("hasRole('ADMIN')")
    public String messageAdmin() {
        return "WELCOME ADMINOS";
    }

    @GetMapping("/userminimum")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public String messageUser() {
        return "WELCOME USEROS";
    }

    @GetMapping("/auth")
    public Principal authentication (Principal userCredentials) {
        return userCredentials;
    }
}
