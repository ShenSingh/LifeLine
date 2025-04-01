import axios from 'axios';
import {checkRole} from "../service/AuthService.tsx";

const API_URL = 'http://localhost:8181/api/v1/auth/';

interface RegisterResponse {
    // Define the expected structure of the response data
    // For example:
    id: string;
    email: string;
    // Add other fields as needed
}
export async function register(fName: string, lName: string, hospital: string, email: string, password: string): Promise<RegisterResponse | null> {
    try {

        const role:string = checkRole(email);

        const response = await axios.post<RegisterResponse>(API_URL + 'register', {
            username: "",
            firstName: fName,
            lastName:  lName,
            email:email,
            password: password,
            phone: "",
            address: "",
            hospital:{

            },
            role: role
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

interface LoginResponse {
    accessToken: string;
    // Add other fields as needed
}

export async function login(email: string, password: string): Promise<LoginResponse | null> {
    try {
        const response = await axios.post<LoginResponse>(API_URL + 'login', {
            email,
            password,
        });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function logout() {
    localStorage.removeItem('user');
}

export function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
}
