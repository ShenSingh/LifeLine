package com.zenveus.backend.util;

public enum Role {
    ADMIN, REQUESTER, DONOR;

    public String getRoleName() {
        return "ROLE_" + this.name();  // Converts ADMIN -> "ROLE_ADMIN", REQUESTER -> "ROLE_REQUESTER", etc.
    }
}
