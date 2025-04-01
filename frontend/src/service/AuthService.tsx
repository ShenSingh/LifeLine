



export function checkRole(email: string): string {


    if (email.endsWith("@lifeline.com")) {
        return "ADMIN";
    }else {
        return "REQUESTER";
    }

}
