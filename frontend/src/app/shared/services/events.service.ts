import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IEvent } from '../models/event';
import { IEventCreateRequest } from '../models/event-create-request';
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

  getNearbyEvents(
    location: ILocation,
    radiusMiles: number = 50,
    limit: number = 20,
  ): Observable<IMapMarker[]> {
    const safeLimit = Math.max(1, Math.min(limit, 100));

    return this.http
      .get<IEvent[]>(`${this.eventsApiUrl}/nearby`, {
        params: {
          lat: location.lat.toString(),
          lng: location.lng.toString(),
          radius: radiusMiles.toString(),
          limit: safeLimit.toString(),
        },
      })
      .pipe(
        map((events: IEvent[]) =>
          events
            .filter(
              (event) =>
                Number.isFinite(event.location?.lat) && Number.isFinite(event.location?.lng),
            )
            .map((event) => ({
              lat: event.location!.lat,
              lng: event.location!.lng,
              popup: `<b>${event.eventName}</b><br><small>${new Date(event.dateTime).toLocaleString()}</small>`,
              navigation:
                (event.eventType ?? '').trim().toLowerCase() === 'game'
                  ? {
                      path: '/game-details' as const,
                      queryParams: {
                        eventId: event.eventId,
                        gameId: event.gameId,
                        gameName: event.eventName,
                        venueName: event.venueName,
                        dateTime: event.dateTime?.toString(),
                        lat: event.location?.lat,
                        lng: event.location?.lng,
                        homeLogo: event.teamLogos?.home ?? '',
                        awayLogo: event.teamLogos?.away ?? '',
                        league: event.league ?? '',
                        saved: event.isSaved,
                      },
                    }
                  : {
                      path: '/event-details' as const,
                      queryParams: {
                        eventId: event.eventId,
                        eventName: event.eventName,
                        description: event.description ?? '',
                        eventType: event.eventType,
                        venueName: event.venueName,
                        location: event.venueName,
                        dateTime: event.dateTime?.toString(),
                        lat: event.location?.lat,
                        lng: event.location?.lng,
                        imageUrl: event.imageUrl ?? '',
                        league: event.league ?? '',
                        isUserCreated: event.isUserCreated ?? false,
                        saved: event.isSaved,
                      },
                    },
            })),
        ),
      );
  }

  getNearbyEventDetails(
    location: ILocation,
    radiusMiles: number = 50,
    limit: number = 100,
  ): Observable<IEvent[]> {
    const safeLimit = Math.max(1, Math.min(limit, 100));

    return this.http.get<IEvent[]>(`${this.eventsApiUrl}/nearby`, {
      params: {
        lat: location.lat.toString(),
        lng: location.lng.toString(),
        radius: radiusMiles.toString(),
        limit: safeLimit.toString(),
      },
    });
  }

  searchEvents(filters: IEventFilters = DEFAULT_EVENT_FILTERS): Observable<IEvent[]> {
    return this.http.post<IEvent[]>(`${this.eventsApiUrl}/search`, filters);
  }

  createEvent(body: IEventCreateRequest): Observable<IEvent> {
    return this.http.post<IEvent>(this.eventsApiUrl, body);
  }
}
