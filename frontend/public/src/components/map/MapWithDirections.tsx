import { useEffect, useRef } from "react";

const MapWithDirections = () => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

    const hospitalLocations = "Dekatana, Sri Lanka";

    useEffect(() => {
        // Initialize the map
        const mapElement = document.getElementById("map") as HTMLElement;
        const map = new google.maps.Map(mapElement, {
            center: { lat: 6.9271, lng: 79.8612 }, // Centered on Colombo, Sri Lanka
            zoom: 8,
        });
        mapRef.current = map;

        // Initialize DirectionsRenderer
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        directionsRendererRef.current = directionsRenderer;

        // Get current location and request directions
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const origin = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    const directionsService = new google.maps.DirectionsService();
                    const routeConfig = {
                        origin,
                        destination: hospitalLocations,
                        provideRouteAlternatives: false,
                        travelMode: google.maps.TravelMode.DRIVING,
                        drivingOptions: {
                            departureTime: new Date(), // Now or future date
                            trafficModel: google.maps.TrafficModel.PESSIMISTIC,
                        },
                        unitSystem: google.maps.UnitSystem.IMPERIAL,
                    };

                    directionsService.route(routeConfig, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsRenderer.setDirections(result);

                            // Extract and log the estimated time
                            const legs = result.routes[0].legs;
                            if (legs && legs.length > 0) {
                                const estimatedTime = legs[0].duration.text;
                                console.log("Estimated Time:", estimatedTime);

                                // Optionally, display the estimated time on the map
                                const infoWindow = new google.maps.InfoWindow({
                                    content: `Estimated Time: ${estimatedTime}`,
                                    position: origin,
                                });
                                infoWindow.open(map);
                            }
                        } else {
                            console.error("Directions request failed due to " + status);
                        }
                    });
                },
                () => {
                    console.error("Error: Unable to retrieve your location.");
                }
            );
        } else {
            console.error("Error: Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <div
            id="map"
            style={{
                height: "100vh",
                width: "100%",
            }}
        ></div>
    );
};

export default MapWithDirections;
