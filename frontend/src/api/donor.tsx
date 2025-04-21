import axios from 'axios';

const API_BASE_URL = 'http://localhost:8181/api/v1/donor';

export interface Donor {
    id: string;
    age: string;
    gender: string;
    bloodType: string;
    numberOfTimesDonated: number;
    lastDonationDate: string;
    willingToDonateFrequency: string;
    longTermIllness: boolean;
    takingMedicine: boolean;
    undergoneSurgery: boolean;
}

export const createDonor = async (donor: Donor) => {
    console.log('Creating donor:=========', donor);
    try {
        const response = await axios.post(API_BASE_URL+'/create', donor, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating donor:', error);
        throw error;
    }
};

export const loadAllDonors = async () => {
    console.log('Loading all donors');
    try {
        const response = await axios.get(API_BASE_URL + '/all', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('Response:', JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error('Error loading all donors:', error);
        throw error;
    }
}


// get donor by id
export const getDonorById = async (id: string | null) => {
    console.log('Loading donor by ID:', id);
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error loading donor by ID:', error);
        throw error;
    }
};


// update donor
export const updateDonor = async (donor: {
    age: number;
    gender: string;
    bloodType: string;
    numberOfTimesDonated: number;
    lastDonationDate: string;
    willingToDonateFrequency: string;
    longTermIllness: boolean;
    takingMedicine: boolean;
    undergoneSurgery: boolean;
    id: string | null
}) => {
    console.log('Updating donor:', donor);
    try {
        const response = await axios.put(`${API_BASE_URL}/update`, donor, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating donor:', error);
        throw error;
    }
};
