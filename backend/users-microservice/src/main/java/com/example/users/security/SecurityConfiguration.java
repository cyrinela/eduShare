package com.example.users.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity()
public class SecurityConfiguration {

    private final JWTConverter jwtConverter;

    public SecurityConfiguration(JWTConverter jwtConverter) {
        this.jwtConverter = jwtConverter;
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());
        http.authorizeHttpRequests(auth ->
                auth
                        .requestMatchers("/user/login").permitAll()
                        .requestMatchers("/user/signup").permitAll()
                        .requestMatchers("/callback").permitAll()
                        .requestMatchers("/userinfo").permitAll()
                        .requestMatchers("/user/resetpassword").permitAll()
                        .requestMatchers("/user/modify").permitAll()
                        .requestMatchers("/user/logout").permitAll()
                        .anyRequest().authenticated());
        http.oauth2ResourceServer(ors -> ors.jwt(jwtConfigurer -> jwtConfigurer.jwtAuthenticationConverter(jwtConverter)));
        http.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
}


