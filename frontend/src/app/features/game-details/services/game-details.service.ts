import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParamMap } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { EventTypeEnum } from '../../../shared/models/event-type-enum';
import { ISafetyAlert } from '../../../shared/models/safety-alert';
import { IEvent } from '../../../shared/models/event';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameDetailsService {
  private readonly defaultCenter = { lat: 39.8283, lng: -98.5795 };

  constructor(private readonly http: HttpClient) {}

  getGameChatEventId(gameId: number): Observable<string> {
    return this.http
      .get<{ eventId: string }>(`${environment.apiUrl}/events/game-channel/${gameId}`)
      .pipe(map((res) => res.eventId));
  }

  getGameFromQuery(params: ParamMap): Observable<IEvent> {
    const eventId = params.get('eventId') ?? '';
    const gameIdParam = params.get('gameId');
    const parsedGameId = gameIdParam ? Number(gameIdParam) : NaN;
    const gameId = Number.isFinite(parsedGameId) && parsedGameId > 0 ? parsedGameId : undefined;
    const gameName = params.get('gameName') ?? 'Away Team @ Home Team';
    const venueName = params.get('location') ?? params.get('venueName') ?? 'Venue TBD';
    const league = params.get('league') ?? undefined;

    const homeLogo = params.get('homeLogo') ?? undefined;
    const awayLogo = params.get('awayLogo') ?? undefined;

    const dateParam = params.get('dateTime') ?? params.get('date');
    const parsedDate = dateParam ? new Date(dateParam) : null;
    const gameDateTime = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : null;

    const lat = Number(params.get('lat'));
    const lng = Number(params.get('lng'));
    const gameCenter = Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : this.defaultCenter;

    const isSaved = params.get('saved') === 'true';

    return of({
      eventId,
      gameId,
      eventType: EventTypeEnum.Game,
      eventName: gameName,
      dateTime: gameDateTime ?? new Date(),
      location: gameCenter,
      venueName,
      teamLogos: {
        home: homeLogo,
        away: awayLogo,
      },
      league,
      isUserCreated: false,
      isSaved,
    });
  }

  getGameEvents(game: IEvent): Observable<IEvent[]> {
    if (!game.gameId) {
      return of([]);
    }

    return this.http.get<IEvent[]>(`${environment.apiUrl}/events/game/${game.gameId}/events`);
  }

  getSafetyAlerts(game: IEvent): Observable<ISafetyAlert[]> {
    if (!game.gameId) {
      return of([]);
    }

    return this.http.get<ISafetyAlert[]>(`${environment.apiUrl}/events/game/${game.gameId}/safety-alerts`);
  }

}
