package com.devpulse.auth;

import com.devpulse.model.User;
import com.devpulse.repository.UserRepository;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HexFormat;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ApiKeyService {
  private final UserRepository users;
  private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
  private final SecureRandom random = new SecureRandom();

  public ApiKeyService(UserRepository users) {
    this.users = users;
  }

  public RegistrationResult register(String email, String password) {
    if (users.findByEmail(email).isPresent()) {
      throw new IllegalArgumentException("Email already registered");
    }
    String key = generateKey();
    User user = new User();
    user.setEmail(email.toLowerCase());
    user.setPasswordHash(passwordEncoder.encode(password));
    user.setApiKeyHash(hash(key));
    users.save(user);
    return new RegistrationResult(user.getEmail(), key);
  }

  public Optional<User> login(String email, String password) {
    return users.findByEmail(email.toLowerCase())
      .filter(user -> passwordEncoder.matches(password, user.getPasswordHash()));
  }

  public Optional<User> validate(String apiKey) {
    if (apiKey == null || apiKey.isBlank()) {
      return Optional.empty();
    }
    return users.findByApiKeyHashAndActiveTrue(hash(apiKey));
  }

  public String generateKey() {
    byte[] bytes = new byte[24];
    random.nextBytes(bytes);
    return "dp_live_" + HexFormat.of().formatHex(bytes);
  }

  public String hash(String value) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      return HexFormat.of().formatHex(digest.digest(value.getBytes(StandardCharsets.UTF_8)));
    } catch (NoSuchAlgorithmException e) {
      throw new IllegalStateException(e);
    }
  }

  public record RegistrationResult(String email, String apiKey) {}
}
