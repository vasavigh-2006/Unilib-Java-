package com.example.library.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class PasswordUtil {

    private static final String SALT_PREFIX = "$SHA256$";

    public static String hashPassword(String plainPassword) {
        if (plainPassword == null || plainPassword.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        try {
            byte[] salt = new byte[16];
            new SecureRandom().nextBytes(salt);
            String saltBase64 = Base64.getEncoder().encodeToString(salt);

            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] hashedPassword = md.digest(plainPassword.getBytes(StandardCharsets.UTF_8));
            String hashBase64 = Base64.getEncoder().encodeToString(hashedPassword);

            return SALT_PREFIX + saltBase64 + "$" + hashBase64;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }

    public static boolean verifyPassword(String plainPassword, String storedHash) {
        if (plainPassword == null || storedHash == null) {
            return false;
        }

        // Support backward compatibility for legacy plaintext passwords
        if (!storedHash.startsWith(SALT_PREFIX)) {
            return plainPassword.equals(storedHash);
        }

        try {
            String[] parts = storedHash.substring(SALT_PREFIX.length()).split("\\$");
            if (parts.length != 2) {
                return false;
            }
            byte[] salt = Base64.getDecoder().decode(parts[0]);
            String expectedHash = parts[1];

            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] actualHashedBytes = md.digest(plainPassword.getBytes(StandardCharsets.UTF_8));
            String actualHash = Base64.getEncoder().encodeToString(actualHashedBytes);

            return expectedHash.equals(actualHash);
        } catch (Exception e) {
            return false;
        }
    }
}
