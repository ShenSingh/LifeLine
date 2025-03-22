package com.zenveus.backend.service.impl;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.zenveus.backend.service.FirebaseAuthService;
import org.springframework.stereotype.Service;

@Service
public class FirebaseAuthServiceImpl implements FirebaseAuthService {

    @Override
    public FirebaseToken verifyToken(String token) throws Exception {
        return FirebaseAuth.getInstance().verifyIdToken(token);
    }
}

