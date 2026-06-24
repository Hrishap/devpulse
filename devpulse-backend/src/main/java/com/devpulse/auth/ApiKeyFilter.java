package com.devpulse.auth;

import com.devpulse.model.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class ApiKeyFilter extends OncePerRequestFilter {
  public static final String HEADER = "X-API-Key";
  private final ApiKeyService apiKeys;

  public ApiKeyFilter(ApiKeyService apiKeys) {
    this.apiKeys = apiKeys;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    String path = request.getRequestURI();
    if (path.startsWith("/api/auth/") || path.startsWith("/actuator/")) {
      chain.doFilter(request, response);
      return;
    }
    apiKeys.validate(request.getHeader(HEADER)).ifPresent(user -> {
      UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, List.of());
      SecurityContextHolder.getContext().setAuthentication(auth);
    });
    chain.doFilter(request, response);
  }
}
