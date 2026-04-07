import * as L from 'leaflet'

type MapMarkerQueryParamValue = string | number | boolean;

export interface IMapMarkerNavigation {
    path: '/event-details' | '/game-details';
    queryParams: Record<string, MapMarkerQueryParamValue | undefined>;
}

export interface IMapMarker {
    lat: number;
    lng: number;
    popup?: string;
    icon?: L.Icon;
    navigation?: IMapMarkerNavigation;
}