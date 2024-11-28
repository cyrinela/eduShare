package Gs_Data.project.com.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws
            Exception {

        http.sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests((requests)->requests
                        // resources
                        .requestMatchers(HttpMethod.GET,"/ressources").permitAll() // for visitors
                        .requestMatchers(HttpMethod.GET,"/ressources/search").permitAll() // for visitors
                        .requestMatchers(HttpMethod.GET,"/ressources/**").hasAnyAuthority("ADMIN","USER")
                        .requestMatchers(HttpMethod.GET,"/ressources/download/**").hasAnyAuthority("ADMIN","USER")
                        .requestMatchers(HttpMethod.POST,"/ressources/add").hasAnyAuthority("ADMIN","USER")
                        .requestMatchers(HttpMethod.PUT,"/ressources/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE,"/ressources/**").hasAuthority("ADMIN")
                        // categories
                        .requestMatchers(HttpMethod.GET,"/categories").permitAll()
                        .requestMatchers(HttpMethod.GET,"/categories/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/categories").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/categories/modify/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/categories/delete/**").hasAuthority("ADMIN")
                        // commentaires
                        .requestMatchers("/commentaires/**").hasAnyAuthority("ADMIN","USER")
                        // study groups
                        .requestMatchers("/groups/**").hasAnyAuthority("ADMIN","USER")
                        .anyRequest().authenticated() )

                .addFilterBefore(new JWTAuthorizationFilter(),
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
