package com.devpulse.auth;

import com.devpulse.model.User;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final ApiKeyService apiKeys;

  public AuthController(ApiKeyService apiKeys) {
    this.apiKeys = apiKeys;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody AuthRequest request) {
    if (request.email() == null || request.password() == null || request.password().length() < 8) {
      return ResponseEntity.badRequest().body(Map.of("message", "Email and an 8+ character password are required."));
    }
    return ResponseEntity.ok(apiKeys.register(request.email(), request.password()));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody AuthRequest request) {
    return apiKeys.login(request.email(), request.password())
      .<ResponseEntity<?>>map(user -> ResponseEntity.ok(new LoginResponse(user.getEmail(), "Use the API key shown at registration.")))
      .orElseGet(() -> ResponseEntity.status(401).body(Map.of("message", "Invalid email or password.")));
  }

  public record AuthRequest(String email, String password) {}
  public record LoginResponse(String email, String message) {}
}
