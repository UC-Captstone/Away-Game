import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IEvent } from '../models/event';
import { ILocation } from '../models/location';
import { IMapMarker } from '../models/map-marker';
import {
	DEFAULT_EVENT_FILTERS,
	IEventFilters,
} from '../../features/event-search/models/event-search-filters';

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	private readonly eventsApiUrl = environment.apiUrl + '/events';

	constructor(private readonly http: HttpClient) {}

	getFeaturedEvents(): Observable<IEvent[]> {
		return this.http.get<IEvent[]>(`${this.eventsApiUrl}/featured`);
	}

	getNearbyEvents(location: ILocation, radiusMiles: number = 50): Observable<IMapMarker[]> {
		return this.http
			.get<IEvent[]>(`${this.eventsApiUrl}/nearby`, {
				params: {
					lat: location.lat.toString(),
					lng: location.lng.toString(),
					radius: radiusMiles.toString(),
				},
			})
			.pipe(
				map((events: IEvent[]) =>
					events.map((event) => ({
						lat: event.location.lat,
						lng: event.location.lng,
						popup: `<b>${event.eventName}</b><br><small>${new Date(event.dateTime).toLocaleString()}</small>`,
					})),
				),
			);
	}

	searchEvents(filters: IEventFilters = DEFAULT_EVENT_FILTERS): Observable<IEvent[]> {
		return this.http.post<IEvent[]>(`${this.eventsApiUrl}/search`, filters);
	}
}
