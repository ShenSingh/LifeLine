import axios from 'axios';

const url = 'http://localhost:8181/api/v1/hospital/';

export interface Hospital {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
    district: string;
}

export default async function getHospitalList(): Promise<Hospital[] | null> {
    try {
        const response = await axios.get<Hospital[]>(url+'getAllHospitals');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
