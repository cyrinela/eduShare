package Gs_Data.project.com.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class JwtRequestWrapper extends HttpServletRequestWrapper {

    private final String token;

    public JwtRequestWrapper(HttpServletRequest request, String token) {
        super(request);
        this.token = token;
    }

    @Override
    public String getHeader(String name) {
        if ("Authorization".equalsIgnoreCase(name)) {
            return "Bearer " + token;
        }
        return super.getHeader(name);
    }

    @Override
    public Enumeration<String> getHeaders(String name) {
        if ("Authorization".equalsIgnoreCase(name)) {
            return Collections.enumeration(Collections.singletonList("Bearer " + token));
        }
        return super.getHeaders(name);
    }

    @Override
    public Enumeration<String> getHeaderNames() {
        Map<String, String> headers = new HashMap<>();
        headers.putAll(Collections.list(super.getHeaderNames()).stream()
                .collect(HashMap::new, (m, h) -> m.put(h, super.getHeader(h)), Map::putAll));
        headers.put("Authorization", "Bearer " + token);
        return Collections.enumeration(headers.keySet());
    }
}

