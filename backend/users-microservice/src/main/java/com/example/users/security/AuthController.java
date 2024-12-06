package com.example.users.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;

@RestController
public class AuthController {

    @GetMapping("/auth")
    public ResponseEntity<?> authentication (Principal userCredentials, HttpServletResponse response) {
        try {
            if (userCredentials instanceof Authentication) {
                Authentication authentication = (Authentication) userCredentials;
                Object credentials = authentication.getCredentials();

                Jwt jwt = (Jwt) credentials;

                String cookieHeader = String.format(
                        "auth=%s; HttpOnly; Secure; Path=/; Max-Age=%d; SameSite=%s",
                        jwt.getTokenValue(), Duration.between(Instant.now(), jwt.getExpiresAt()).getSeconds() , "none"
                );

                response.setHeader("Set-Cookie", cookieHeader);
                return ResponseEntity.ok("Cookie created successfully");
            }
            return ResponseEntity.internalServerError().body("Error occurred,\nCannot extract cookie from request!");
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error occurred,\nCannot extract cookie from request!");
        }
    }
}
