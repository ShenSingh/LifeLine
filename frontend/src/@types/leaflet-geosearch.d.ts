// src/@types/leaflet-geosearch.d.ts

declare module 'leaflet-geosearch' {
    import { Control } from 'leaflet';

    export interface SearchResult {
        label: string;
        x: number;  // longitude
        y: number;  // latitude
        bounds: [[number, number], [number, number]];
    }

    export class OpenStreetMapProvider {
        constructor(options?: { params?: Record<string, string> });
        search(query: string): Promise<SearchResult[]>;
    }

    export class GeoSearchControl extends Control {
        constructor(options: {
            provider: OpenStreetMapProvider;
            style?: string;
            showMarker?: boolean;
            autoClose?: boolean;
            retainZoomLevel?: boolean;
            animateZoom?: boolean;
            searchLabel?: string;
        });
    }
}
