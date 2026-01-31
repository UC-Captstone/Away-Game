import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { IEvent } from '../models/event';
import { EventTypeEnum } from '../../../shared/models/event-type-enum';
import { ILocation } from '../../../shared/models/location';
import { IMapMarker } from '../../../shared/models/map-marker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // Nathan: wait for merge
  // private apiUrl = environment.apiUrl + '/events';
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getFeaturedEvents(): Observable<IEvent[]> {
    const featuredEvents: IEvent[] = [
      {
        eventId: '1',
        eventType: EventTypeEnum.Tailgate,
        eventName: 'Sample Tailgate Event',
        dateTime: new Date('2024-10-15T18:00:00Z'),
        location: { lat: 34.0522, lng: -118.2437 },
        venueName: 'Sample Stadium Parking Lot',
        imageUrl: '/assets/tailgate.png',
        isSaved: false,
      },
      {
        eventId: '2',
        eventType: EventTypeEnum.Game,
        eventName: 'Sample Game Event',
        dateTime: new Date('2024-11-20T20:00:00Z'),
        location: { lat: 34.0522, lng: -118.2437 },
        venueName: 'Sample Arena',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png',
          away: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
        },
        isSaved: true,
      },
      {
        eventId: '3',
        eventType: EventTypeEnum.Game,
        eventName: 'Another Game Event',
        dateTime: new Date('2024-12-05T19:30:00Z'),
        location: { lat: 34.0522, lng: -118.2437 },
        venueName: 'Another Stadium',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png',
          away: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
        },
        isSaved: false,
      },
      {
        eventId: '4',
        eventType: EventTypeEnum.Tailgate,
        eventName: 'Another Tailgate Event',
        dateTime: new Date('2024-09-10T17:00:00Z'),
        location: { lat: 34.0522, lng: -118.2437 },
        venueName: 'Another Stadium Parking Lot',
        imageUrl: '/assets/tailgate.png',
        isSaved: true,
      },
    ];

    // Nathan: Placeholder for actual HTTP request
    // TODO: Replace with: this.http.get<IEvent[]>(`${this.apiUrl}/featured`)
    return of(featuredEvents).pipe(delay(1000));
  }

  getNearbyEvents(location: ILocation, radiusMiles: number = 50): Observable<IMapMarker[]> {
    const mockEvents: IEvent[] = [
      {
        eventId: '101',
        eventType: EventTypeEnum.Game,
        eventName: 'Bearcats vs Bears',
        dateTime: new Date('2025-01-30T20:00:00Z'),
        location: { lat: 39.1312, lng: -84.5162 },
        venueName: 'Nippert Stadium',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/ncaa/500/2132.png',
          away: 'https://a.espncdn.com/i/teamlogos/ncaa/500/239.png',
        },
        isSaved: false,
      },
      {
        eventId: '102',
        eventType: EventTypeEnum.Game,
        eventName: 'Bengals vs Ravens',
        dateTime: new Date('2025-01-30T20:00:00Z'),
        location: { lat: 39.0955, lng: -84.5161 },
        venueName: 'Paycor Stadium',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png',
          away: 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png',
        },
        isSaved: false,
      },
      {
        eventId: '103',
        eventType: EventTypeEnum.Game,
        eventName: 'Reds vs Cardinals',
        dateTime: new Date('2025-01-30T20:00:00Z'),
        location: { lat: 39.0974, lng: -84.5071 },
        venueName: 'Great American Ball Park',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/mlb/500/cin.png',
          away: 'https://a.espncdn.com/i/teamlogos/mlb/500/stl.png',
        },
        isSaved: false,
      },
      {
        eventId: '104',
        eventType: EventTypeEnum.WatchParty,
        eventName: 'Bengals Watch Party',
        dateTime: new Date('2025-01-30T18:00:00Z'),
        location: { lat: 39.1037, lng: -84.5136 },
        venueName: 'Pins Mechanical Co.',
        imageUrl: '/assets/tailgate2.png',
        isSaved: false,
      },
    ];

    const markers: IMapMarker[] = mockEvents.map((event) => ({
      lat: event.location.lat,
      lng: event.location.lng,
      popup: `<b>${event.eventName}</b><br><small>${event.dateTime.toLocaleString()}</small>`,
    }));

    // Nathan: Placeholder for actual HTTP request
    // TODO: Replace with: this.http.get<IMapMarker[]>(`${this.apiUrl}/nearby`, { params: { lat, lng, radius: radiusMiles } })
    return of(markers).pipe(delay(800));
  }
}
