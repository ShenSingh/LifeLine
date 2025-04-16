import axios from "axios";
import {Hospital} from "./hospital.tsx";
import {getToken} from "../service/AuthService.tsx";

const API_BASE_URL = "http://localhost:8181/api/v1/bloodRequest/"; // Replace with your API base URL
export interface BloodRequest {
    bloodType: string;
    hospital: Hospital;
}

const token = getToken();

// Create a new blood request
export const createBloodRequest = async (data: BloodRequest) => {
    try {
        const response = await axios.post(API_BASE_URL+ 'create', data,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Blood request :", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating blood request:", error);
        throw error;
    }
};


// Fetch a single blood request by ID
export const fetchBloodRequestById = async (id: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/blood-requests/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blood request by ID:", error);
        throw error;
    }
};

// Update a blood request
export const updateBloodRequest = async (id: string, data: Partial<{
    bloodType: string;
    email: string;
    phoneNumber: string;
    hospital: string;
}>) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/blood-requests/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating blood request:", error);
        throw error;
    }
};

// Delete a blood request
export const deleteBloodRequest = async (id: string) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/blood-requests/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting blood request:", error);
        throw error;
    }
};
