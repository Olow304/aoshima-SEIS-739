package com.olow.grpccms.grpccms.util;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.Date;

@Component
public class JwtUtil {
    // Generate a token using the jsonwebtoken library
    public String generateToken(String username, String email) {
        // Define a secret key from the custom string "olow"
        String secretString = "olow";
        byte[] secretKeyBytes;
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            secretKeyBytes = digest.digest(secretString.getBytes(StandardCharsets.UTF_8));
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("Unable to generate secret key using SHA-256", e);
        }
        Key secretKey = new SecretKeySpec(secretKeyBytes, SignatureAlgorithm.HS256.getJcaName());


        // Set token expiration time (e.g., 10 hours)
        long expirationMillis = Duration.ofHours(10).toMillis();
        Date expirationDate = new Date(System.currentTimeMillis() + expirationMillis);

        // Create the JWT token
        String token = Jwts.builder()
                .setSubject(username)
                .claim("email", email)
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(secretKey)
                .compact();

        return token;
    }

    public Jws<Claims> parseToken(String token) {
        try {
            // Define the same secret key used to generate tokens
            String secretString = "olow";
            byte[] secretKeyBytes;
            try {
                MessageDigest digest = MessageDigest.getInstance("SHA-256");
                secretKeyBytes = digest.digest(secretString.getBytes(StandardCharsets.UTF_8));
            } catch (NoSuchAlgorithmException e) {
                throw new IllegalStateException("Unable to generate secret key using SHA-256", e);
            }
            Key secretKey = new SecretKeySpec(secretKeyBytes, SignatureAlgorithm.HS256.getJcaName());


            System.out.println("Secret key: " + token);
            System.out.println("Secret key: " + secretKey);

            // Parse and validate the token
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);

            System.out.println("Claims: " + claimsJws);

            return claimsJws;
        } catch (JwtException e) {
            // Invalid token, return null
            return null;
        }
    }
}
