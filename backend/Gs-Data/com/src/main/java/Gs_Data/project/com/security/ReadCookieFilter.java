package Gs_Data.project.com.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class ReadCookieFilter extends OncePerRequestFilter {

    private static final String COOKIE_NAME = "auth";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (COOKIE_NAME.equals(cookie.getName())) {
                    String token = cookie.getValue();

                    // Set the token as a Bearer token in the Authorization header
                    request = new JwtRequestWrapper(request, token);
                    break;
                }
            }
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
