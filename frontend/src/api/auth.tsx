import axios from 'axios';
import {checkRole, setToken} from "../service/AuthService.tsx";
import {Hospital} from "./hospital.tsx";

const API_URL = 'http://localhost:8181/api/v1/auth/';

export async function register(fName: string, lName: string, hospital:Hospital, email: string, password: string){
    try {

        const role:string = checkRole(email);

        const response = await axios.post(API_URL + 'register', {
            username: "",
            firstName: fName,
            lastName:  lName,
            email:email,
            password: password,
            phone: "",
            address: "",
            hospital:hospital,
            role: role,
            status: "ACTIVE"
        });

        console.log(response.data.data.token);

        if (response.data.data.token) {
            setToken(response.data.data.token);
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function login(email: string, password: string) {
    try {
        const role:string = checkRole(email);
        const response = await axios.post(API_URL + 'login', {
            email,
            password,
            role

        });
        if (response.data.data.token) {
            setToken(response.data.data.token);
        }

        console.log(response.data.data.token);

        if(checkRole(response.data.data.email) === "ADMIN"){
            window.location.href = "/admin";
        }else {
            window.location.href = "/";
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
