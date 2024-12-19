package com.example.users.security;

import com.example.users.entities.AuthResponse;
import com.example.users.entities.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.time.Duration;
import java.time.Instant;
import java.util.Map;

@RestController
public class AuthController {

    @Autowired
    private KeycloakService keycloakService;

    @PostMapping("/user/login")
    public ResponseEntity<?> Login(@RequestParam String username, @RequestParam String password,
                                   HttpServletResponse response) {

        Mono<AuthResponse> Response = keycloakService.Login(false,false,null,username,password);
        return keycloakService.CreateCookies(Response.block(),response);
    }
    @PostMapping("/user/signup")
    public String Signup(@RequestBody User user) {
        // LOGIN AS ADMIN
        Mono<AuthResponse> authResponse = keycloakService.Login(true,false,null,null, null);
        // CREATE USER
        keycloakService.SignUp(authResponse.block().getAccessToken(), user);
        // ASSIGN ROLE USER
        return keycloakService.AssignRole(authResponse.block().getAccessToken(), user.getUsername(), "USER");
    }

    @GetMapping("/callback")
    public ResponseEntity<?> handleGoogleCallback(@RequestParam("code") String code, HttpServletResponse response) {
        // LOG IN WITH IDP
        Mono<AuthResponse> authResponse = keycloakService.Login(false, true, code, null, null);
        // CREATE COOKIES
        return keycloakService.CreateCookies(authResponse.block(),response);
    }

    @GetMapping("/userinfo")
    public Map<String,Object> getUserData(@RequestParam("username") String username) {
        // LOGIN AS ADMIN
        Mono<AuthResponse> authResponse = keycloakService.Login(true,false,null,null, null);
        // GET USER DATA
        return keycloakService.getUserData(authResponse.block().getAccessToken(), username).block();
    }

    @PostMapping("/user/resetpassword")
    public Map<String,Object> resetPassword(@RequestParam("userId") String userId ,@RequestBody Map<String, Object> newPassword) {
        // LOGIN AS ADMIN
        Mono<AuthResponse> authResponse = keycloakService.Login(true,false,null,null, null);
        // RESET USER PASSWORD
        return keycloakService.ResetPassword(newPassword, userId, authResponse.block().getAccessToken());
    }

    @PostMapping("/user/modify")
    public Map<String,Object> modifyUser(@RequestParam("userId") String userId ,@RequestBody Map<String, Object> newData) {
        // LOGIN AS ADMIN
        Mono<AuthResponse> authResponse = keycloakService.Login(true,false,null,null, null);
        // RESET USER PASSWORD
        return keycloakService.ModifyUser(newData, userId, authResponse.block().getAccessToken());
    }

    @GetMapping("/user/logout")
    public ResponseEntity<?> logOut(HttpServletResponse response) {
        return keycloakService.DeleteCookies("auth", response);
    }
}
