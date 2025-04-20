import axios from "axios";
import {Hospital} from "./hospital.tsx";


const USER_API_URL = 'http://localhost:8181/api/v1/user';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    hospital: Hospital;
    role: string;
}


// get user
export async function getUser() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get<User>(`${USER_API_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log('Response: User', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}


// api/user.ts
export async function updateUser(updatedUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    hospital: Hospital;
    role: string
}) {
    try {
        // Correct endpoint URL with dynamic ID
        const response = await axios.put<User>(
            `${USER_API_URL}/${updatedUser.id}`,
            {
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                hospital: updatedUser.hospital,
                role: updatedUser.role
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('User updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
