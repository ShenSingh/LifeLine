package com.zenveus.backend.util;

import com.zenveus.backend.dto.UserDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.validation.Valid;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@PropertySource(ignoreResourceNotFound = true, value = "classpath:otherprops.properties")
public class JwtUtil implements Serializable {

    private static final long serialVersionUID = 234234523523L;

    public static final long JWT_TOKEN_VALIDITY = 24 * 60 * 60 * 12;

    private static String secretKey;

    private static String generateSecretKey(String email) {
        byte[] key = new byte[64];
        new SecureRandom().nextBytes(key);
        secretKey=Base64.getEncoder().encodeToString((email + Base64.getEncoder().encodeToString(key)).getBytes());

        return  secretKey;
    }

    //retrieve username from jwt token
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    //retrieve expiration date from jwt token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    //for retrieving any information from token we will need the secret key
    private Claims getAllClaimsFromToken(String token) {
        String email = getUsernameFromToken(token);
        String secretKey = generateSecretKey(email);
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    //check if the token has expired
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    //generate token for user
    public static String generateToken(@Valid UserDTO userDTO) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", userDTO.getRole());
        String secretKey = generateSecretKey(userDTO.getEmail());
        System.out.println("Secret Key: " + secretKey);
        String t = doGenerateToken(claims, userDTO.getEmail(), secretKey);
        if (t == null || t.isEmpty()) {
            System.out.println("Token generation failed.");
        } else {
            System.out.println("Token: " + t);
        }
        return t;
    }

    private static String doGenerateToken(Map<String, Object> claims, String subject, String secretKey) {
        try {
            System.out.println("Generating token with subject: " + subject + " and secretKey: " + secretKey);
            String token = Jwts.builder()
                    .setClaims(claims)
                    .setSubject(subject)
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                    .signWith(SignatureAlgorithm.HS512, secretKey).compact();
            System.out.println("Generated token: " + token);
            return token;
        } catch (Exception e) {
            System.out.println("Error generating token: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    //validate token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


    public Claims getUserRoleCodeFromToken(String token) {
        String email = getUsernameFromToken(token);

        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }
}
