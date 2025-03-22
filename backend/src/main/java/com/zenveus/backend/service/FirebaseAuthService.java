package com.zenveus.backend.service;

import com.google.firebase.auth.FirebaseToken;

public interface FirebaseAuthService {
    FirebaseToken verifyToken(String token) throws Exception;
}
