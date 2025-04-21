import axios from "axios";
import { Hospital } from "./hospital.tsx";
import { getToken } from "../service/AuthService.tsx";

const API_BASE_URL = "http://localhost:8181/api/v1/bloodRequest/";

export interface BloodRequest {
    bloodType: string;
    hospital: Hospital;
}

export interface UserBloodRequest {
    id: string;
    bloodType: string;
    status: string;
    createdAt: string | null;
}

const token = getToken();

// Create a new blood request
export const createBloodRequest = async (data: BloodRequest) => {
    try {
        const response = await axios.post(API_BASE_URL + "create", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Blood request:", response.data);
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
export const updateBloodRequest = async (
    id: string,
    data: Partial<{
        bloodType: string;
        email: string;
        phoneNumber: string;
        hospital: string;
    }>
) => {
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


export const loadAllBloodRequests = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}all`);
        console.log("Full API Response:", response.data); // Log the full response for debugging

        // Adjust based on the actual structure (commonly response.data.data or just response.data)
        const data = response.data.data || response.data;

        if (!Array.isArray(data)) {
            throw new Error("Expected an array but received a different structure.");
        }

        const requests = data.map((request) => ({
            id: request.id,
            bloodType: request.bloodType,
            hospital: {
                id: request.hospital.id,
                name: request.hospital.name,
                latitude: request.hospital.latitude,
                longitude: request.hospital.longitude,
                district: request.hospital.district,
            },
            status: request.status,
            requestDate: request.createdAt,
            requester: {
                id: request.requester.id,
                username: request.requester.username,
                firstName: request.requester.firstName,
                lastName: request.requester.lastName,
                email: request.requester.email,
                phone: request.requester.phone,
                address: request.requester.address,
                hospital: request.requester.hospital,
                role: request.requester.role,
                status: request.requester.status,
            },
        }));


        return requests;
    } catch (error) {
        console.error("Error loading all blood requests:", error);
        throw error;
    }
};
