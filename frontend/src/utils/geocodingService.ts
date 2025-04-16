// src/utils/geocodingService.ts
export interface Location {
    lat: number;
    lon: number;
    displayName: string;
    addressDetails: Record<string, any>;
}

export const geocodeAddress = async (address: string): Promise<Location | null> => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1`
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                displayName: data[0].display_name,
                addressDetails: data[0].address
            };
        }
        return null;
    } catch (error) {
        console.error("Geocoding error:", error);
        throw error;
    }
};

// Add to src/utils/geocodingService.ts
export interface RouteResponse {
    routes: Array<{
        geometry: {
            coordinates: [number, number][];
        };
        legs: Array<{
            steps: Array<{
                maneuver: {
                    instruction: string;
                };
                distance: number;
            }>;
        }>;
    }>;
}
