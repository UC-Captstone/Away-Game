import * as L from 'leaflet'

export interface IMapMarker {
    lat: number;
    lng: number;
    popup?: string;
    icon?: L.Icon;
}