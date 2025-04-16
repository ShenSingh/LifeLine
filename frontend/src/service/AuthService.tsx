



export function checkRole(email: string): string {
    if (email.endsWith("@lifeline.com")) {
        return "ADMIN";
    }else {
        return "REQUESTER";
    }

}

export function setToken(token: string) {
    localStorage.setItem('token', token);
}

export function getToken() {
    return localStorage.getItem('token');
}


