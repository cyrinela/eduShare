package com.example.users.security;

import com.example.users.entities.AuthResponse;
import com.example.users.entities.User;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KeycloakService {
    private String RealmName = "myRealm";
    private String KeyCloakDomain = "http://localhost:8080";
    private String client_id = "edushare_client";
    private String client_uuid = "7cdbd828-c37a-41c4-979e-ee7d771f4b47";
    private String client_secret = "3SdEXFK7RcefOwqXMlAjGOyJ4958mua6";
    private String IdPRedirectUrl = "http://localhost:8888/GS-USERS/callback";

    private final WebClient webClient;
    public KeycloakService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(KeyCloakDomain).build();
    }

    public Mono<AuthResponse> Login(Boolean asAdmin, Boolean withIdp, String code, String userName, String password) {
        // Start form data
        BodyInserters.FormInserter<String> formData = BodyInserters
                .fromFormData("client_id", client_id)
                .with("client_secret", client_secret);

        if (withIdp) { // USER WITH IDP LOG IN
            formData = formData
                    .with("redirect_uri",IdPRedirectUrl)
                    .with("grant_type","authorization_code")
                    .with("code",code);
        }
        else if (!asAdmin) { // USER LOG IN
            formData = formData
                    .with("username", userName)
                    .with("password", password)
                    .with("grant_type", "password");
        }
        else { // ADMIN LOG IN
            formData = formData.with("grant_type", "client_credentials");
        };

        return webClient.post()
                .uri("""
                /realms/%s/protocol/openid-connect/token""".formatted(RealmName))
                .contentType(MediaType.APPLICATION_FORM_URLENCODED) // Set content type
                .body(formData)
                .retrieve()
                .onStatus(
                        status -> status.isError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(body -> {
                                    // Log the error response
                                    System.err.println("Keycloak error: " + body);
                                    return Mono.error(new RuntimeException("Keycloak authentication failed: " + body));
                                })
                )
                .bodyToMono(AuthResponse.class);
    }

    public ResponseEntity<?> CreateCookies(AuthResponse authResponse, HttpServletResponse response) {
        try {
            String cookieHeader = String.format(
                    "auth=%s; HttpOnly; Secure; Path=/; Max-Age=%d; SameSite=%s",
                    authResponse.getAccessToken(), authResponse.getExpiresIn(), "none"
            );

            response.setHeader("Set-Cookie", cookieHeader);
            return ResponseEntity.ok("Cookie created successfully");

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error occurred,\nCannot extract cookie from request!\n" + e);
        }
    }

    public ResponseEntity<?> DeleteCookies(String CookieName, HttpServletResponse response) {
        try {
            String cookieHeader = String.format(
                    "%s=''; HttpOnly; Secure; Path=/; Max-Age=%d; SameSite=%s",
                    CookieName, 0, "none"
            );

            response.setHeader("Set-Cookie", cookieHeader);
            return ResponseEntity.ok("Cookie created successfully");

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error occurred,\nCannot extract cookie from request!\n" + e);
        }
    }

    public String SignUp(String AdminToken, User user) {
        return webClient.post()
                .uri("""
                /admin/realms/%s/users""".formatted(RealmName))
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + AdminToken) // Add Authorization header
                .contentType(MediaType.APPLICATION_JSON) // Set content type
                .bodyValue(user)
                .retrieve()
                .onStatus(
                        status -> status.isError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(body -> {
                                    // Log the error response
                                    System.err.println("Keycloak error: " + body);
                                    return Mono.error(new RuntimeException("Keycloak Signup failed: " + body));
                                })
                )
                .bodyToMono(String.class).block();
    }

    public String AssignRole(String AdminToken, String UserName, String RoleName) {
        // GET USER ID & ROLE ID
        String RoleId =
                webClient.get()
                .uri("""
                        /admin/realms/%s/clients/%s/roles/%s""".formatted(RealmName, client_uuid, RoleName))
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + AdminToken)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> (String) response.get("id"))
                .block();

        User user =
                webClient.get()
                        .uri("""
                        /admin/realms/%s/users?username=%s""".formatted(RealmName, UserName))
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + AdminToken)
                        .retrieve()
                        .bodyToMono(new ParameterizedTypeReference<List<User>>() {})
                        .map(users -> (users != null && !users.isEmpty()) ? users.get(0) : null)
                        .block();

        // PAYLOAD
        List<Map<String, String>> payload = new ArrayList<>();
        Map<String, String> role = new HashMap<>();
          role.put("id", RoleId);
          role.put("name", RoleName);

        payload.add(role);
        // ASSIGN ROLE
        return webClient.post()
                .uri("""
                /admin/realms/%s/users/%s/role-mappings/clients/%s""".formatted(RealmName, user.getId(), client_uuid))
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + AdminToken) // Add Authorization header
                .contentType(MediaType.APPLICATION_JSON) // Set content type
                .bodyValue(payload)
                .retrieve()
                .onStatus(
                        status -> status.isError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(body -> {
                                    // Log the error response
                                    System.err.println("Keycloak error: " + body);
                                    return Mono.error(new RuntimeException("Keycloak Signup failed: " + body));
                                })
                )
                .bodyToMono(String.class).block();
    }

    public Mono<Map<String,Object>> getUserData(String AdminToken ,String username) {
        return
                webClient.get()
                        .uri("""
                        /admin/realms/%s/users?username=%s""".formatted(RealmName, username))
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + AdminToken)
                        .retrieve()
                        .onStatus(
                                status -> status.isError(),
                                clientResponse -> clientResponse.bodyToMono(String.class)
                                        .flatMap(body -> {
                                            // Log the error response
                                            System.err.println("Keycloak error: " + body);
                                            return Mono.error(new RuntimeException("Error occured: " + body));
                                        })
                        )
                        .bodyToMono(List.class) // Deserialize the response as a List of Maps
                        .flatMap(response -> {
                            if (response.isEmpty()) {
                              return Mono.error(new RuntimeException("Response is empty"));
                            }
                            Map<String, Object> firstObject = (Map<String, Object>) response.get(0); // Get the first element
                            Map<String, Object> result = new HashMap<>();
                            result.put("id", firstObject.get("id"));
                            result.put("username", firstObject.get("username"));
                            result.put("firstName", firstObject.get("firstName"));
                            result.put("lastName", firstObject.get("lastName"));
                            result.put("email", firstObject.get("email"));
                            return Mono.just(result);
                });
    }

    public Map ResetPassword(Map<String, Object> Payload, String userId, String AdminToken) {
        return webClient.put()
                .uri("""
                       /admin/realms/%s/users/%s/reset-password""".formatted(RealmName, userId))
                .header("Content-Type", "application/json") // Explicitly set Content-Type to JSON
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + AdminToken)
                .bodyValue(Payload)    // Set the JSON body
                .retrieve()
                .onStatus(
                        status -> status.isError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(body -> {
                                    // Log the error response
                                    System.err.println("Keycloak error: " + body);
                                    return Mono.error(new RuntimeException("Error occured: " + body));
                                })
                )
                .bodyToMono(Map.class).block();
    }

    public Map ModifyUser(Map<String, Object> Payload, String userId, String AdminToken) {
        return webClient.put()
                .uri("""
                       /admin/realms/%s/users/%s""".formatted(RealmName, userId))
                .header("Content-Type", "application/json") // Explicitly set Content-Type to JSON
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + AdminToken)
                .bodyValue(Payload)    // Set the JSON body
                .retrieve()
                .onStatus(
                        status -> status.isError(),
                        clientResponse -> clientResponse.bodyToMono(String.class)
                                .flatMap(body -> {
                                    // Log the error response
                                    System.err.println("Keycloak error: " + body);
                                    return Mono.error(new RuntimeException("Error occured: " + body));
                                })
                )
                .bodyToMono(Map.class).block();
    }
}
