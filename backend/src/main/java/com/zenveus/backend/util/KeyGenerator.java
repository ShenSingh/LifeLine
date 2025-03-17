package com.zenveus.backend.util;

import java.security.SecureRandom;
import java.util.Base64;

public class KeyGenerator {

    public static String generateSecretKey() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[32]; // 256-bit key
        secureRandom.nextBytes(key);
        String finalKey = Base64.getEncoder().encodeToString(key); // Convert to Base64 string

        System.out.println("==========================================");
        System.out.println("==========================================");
        System.out.println("Generated Secret Key: " + finalKey);

        return finalKey;
    }

    public static void main(String[] args) {
        String secretKey = generateSecretKey();
        System.out.println("Generated Secret Key: " + secretKey);
    }
}
