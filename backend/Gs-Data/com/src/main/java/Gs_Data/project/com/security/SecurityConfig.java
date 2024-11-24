package Gs_Data.project.com.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws
            Exception
    {
        http.sessionManagement( session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf( csrf -> csrf.disable())
                .csrf( csrf -> csrf.disable())
                .authorizeHttpRequests( requests -> requests

                        .requestMatchers("/ressources/all/**").hasAnyAuthority("ADMIN","USER")
                        //.requestMatchers("/ressources/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/ressources/getbyid/**").hasAnyAuthority("ADMIN","USER")
                        .requestMatchers(HttpMethod.POST,"/ressources/address/**").hasAnyAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/ressources/updateress/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE,"/ressources/delress/**").hasAuthority("ADMIN")
                        .anyRequest().authenticated() )
                        .addFilterBefore(new JWTAuthorizationFilter(),
                            UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:4200"); // Frontend URL
        configuration.addAllowedMethod("*"); // Allow all HTTP methods
        configuration.addAllowedHeader("*"); // Allow all headers
        configuration.setAllowCredentials(true); // Allow credentials if necessary

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
