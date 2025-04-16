package com.zenveus.backend.security;

import com.zenveus.backend.util.KeyGenerator;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component  // This makes it a Spring-managed bean
public class JwtTokenProvider {

    private final String SECRET_KEY = KeyGenerator.generateSecretKey();

    public String generateToken(String email) {

        System.out.println("=======================================");
        System.out.println("=======================================");

        System.out.println("email "+ email);
        System.out.println("SECRET_KEY "+ SECRET_KEY);
        // 1 day
        long EXPIRATION_TIME = 86400000;
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}
