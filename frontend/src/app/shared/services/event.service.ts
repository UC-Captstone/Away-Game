import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IEvent } from '../models/event';
import { ILocation } from '../models/location';
import { IMapMarker } from '../models/map-marker';
import { EventTypeEnum } from '../models/event-type-enum';
import { LeagueEnum } from '../models/league-enum';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = environment.apiUrl + '/events';

  constructor(private http: HttpClient) {}

  getFeaturedEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(`${this.apiUrl}/featured`);
  }

  getNearbyEvents(location: ILocation, radiusMiles: number = 50): Observable<IMapMarker[]> {
    return this.http
      .get<IEvent[]>(`${this.apiUrl}/nearby`, {
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

  searchEvents(): Observable<IEvent[]> {
    return of(this.getMockEvents());
  }

  private getMockEvents(): IEvent[] {
    return [
      {
        eventId: '1',
        eventType: EventTypeEnum.Game,
        eventName: 'Warriors at Lakers',
        dateTime: new Date('2026-03-10T19:30:00'),
        location: { lat: 34.043, lng: -118.267 },
        venueName: 'Crypto.com Arena',
        teamLogos: {
          home: '/assets/logos/lakers.png',
          away: '/assets/logos/warriors.png',
        },
        league: LeagueEnum.NBA,
        isSaved: true,
      },
      {
        eventId: '2',
        eventType: EventTypeEnum.Tailgate,
        eventName: 'Downtown Dodgers Tailgate',
        dateTime: new Date('2026-04-05T15:00:00'),
        location: { lat: 34.0739, lng: -118.24 },
        venueName: 'Dodger Stadium Lot 13',
        imageUrl: '/assets/tailgate.png',
        league: LeagueEnum.MLB,
        isUserCreated: true,
        isSaved: false,
      },
      {
        eventId: '3',
        eventType: EventTypeEnum.Pregame,
        eventName: 'NFL Pregame Meetup',
        dateTime: new Date('2026-09-20T11:00:00'),
        location: { lat: 33.9535, lng: -118.3392 },
        venueName: 'Hollywood Park Plaza',
        imageUrl: '/assets/tailgate.png',
        league: LeagueEnum.NFL,
        isSaved: true,
      },
      {
        eventId: '4',
        eventType: EventTypeEnum.Watch,
        eventName: 'MLS Watch Party',
        dateTime: new Date('2026-05-02T18:00:00'),
        location: { lat: 34.0522, lng: -118.2437 },
        venueName: 'LA Live Sports Bar',
        imageUrl: '/assets/tailgate.png',
        league: LeagueEnum.MLS,
        isSaved: false,
      },
      {
        eventId: '5',
        eventType: EventTypeEnum.Game,
        eventName: 'Kings vs Kraken',
        dateTime: new Date('2026-11-14T19:00:00'),
        location: { lat: 34.043, lng: -118.267 },
        venueName: 'Crypto.com Arena',
        teamLogos: {
          home: '/assets/logos/kings.png',
          away: '/assets/logos/kraken.png',
        },
        league: LeagueEnum.NHL,
        isSaved: false,
      },
      {
        eventId: '6',
        eventType: EventTypeEnum.Postgame,
        eventName: 'NCAAB Postgame Hangout',
        dateTime: new Date('2026-02-28T21:15:00'),
        location: { lat: 34.0689, lng: -118.4452 },
        venueName: 'Westwood Fan Lounge',
        imageUrl: '/assets/tailgate.png',
        league: LeagueEnum.NCAAB,
        isUserCreated: true,
        isSaved: true,
      },
    ];
  }
}
