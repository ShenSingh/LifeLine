import { useEffect, useRef, useState } from "react";

const MapWithDirections = () => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Get and decode hospital location from URL parameters
    const currentUrlParams = new URLSearchParams(window.location.search);
    const hospitalLocation = decodeURIComponent(currentUrlParams.get("location") || "")
        .replace(/\+/g, " ")
        .replace(/%2C/g, ",");

    useEffect(() => {
        if (!hospitalLocation) {
            setError("No hospital location provided");
            return;
        }

        // Initialize geocoder
        const geocoder = new google.maps.Geocoder();

        // Geocode hospital location to get coordinates
        geocoder.geocode({ address: hospitalLocation }, (results, status) => {
            if (status !== "OK" || !results?.[0]) {
                setError("Could not find hospital location");
                return;
            }

            const hospitalCoords = results[0].geometry.location;
            initializeMap(hospitalCoords);
        });

        const initializeMap = (destination: google.maps.LatLng) => {
            const mapElement = document.getElementById("map");
            if (!mapElement) {
                setError("Map container not found");
                return;
            }

            // Initialize map
            const map = new google.maps.Map(mapElement, {
                center: { lat: 6.9271, lng: 79.8612 },
                zoom: 8,
            });
            mapRef.current = map;

            // Initialize directions renderer
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            directionsRendererRef.current = directionsRenderer;

            // Get user's current position
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const origin = new google.maps.LatLng(
                            position.coords.latitude,
                            position.coords.longitude
                        );

                        // Configure directions request
                        const directionsService = new google.maps.DirectionsService();
                        const request: google.maps.DirectionsRequest = {
                            origin,
                            destination,
                            travelMode: google.maps.TravelMode.DRIVING,
                            drivingOptions: {
                                departureTime: new Date(),
                                trafficModel: google.maps.TrafficModel.PESSIMISTIC,
                            },
                            unitSystem: google.maps.UnitSystem.IMPERIAL,
                        };

                        // Get directions
                        directionsService.route(request, (result, status) => {
                            if (status === "OK") {
                                directionsRenderer.setDirections(result);

                                // Display estimated time
                                const leg = result.routes[0].legs[0];
                                if (leg?.duration?.text) {
                                    new google.maps.InfoWindow({
                                        content: `Estimated Time: ${leg.duration.text}`,
                                        position: origin,
                                    }).open(map);
                                }
                            } else {
                                setError("Could not calculate directions");
                            }
                        });
                    },
                    () => {
                        setError("Could not get your location");
                    }
                );
            } else {
                setError("Geolocation is not supported by your browser");
            }
        };
    }, [hospitalLocation]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default MapWithDirections;