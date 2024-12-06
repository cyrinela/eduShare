package Gs_Data.project.com.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

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
        http.authorizeHttpRequests(auth -> auth.anyRequest().authenticated());
        // Custom filter for extracting JWT from cookies
        http.addFilterBefore(new ReadCookieFilter(), UsernamePasswordAuthenticationFilter.class);

        http.oauth2ResourceServer(ors -> ors.jwt(jwtConfigurer -> jwtConfigurer.jwtAuthenticationConverter(jwtConverter)));
        http.sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        return http.build();
    }
}


