import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EventTypeEnum } from '../../../shared/models/event-type-enum';
import { ISafetyAlert } from '../../../shared/models/safety-alert';
import { LeagueEnum } from '../../../shared/models/league-enum';
import { IEvent } from '../../../shared/models/event';

@Injectable({
  providedIn: 'root',
})
export class GameDetailsService {
  private readonly defaultCenter = { lat: 39.8283, lng: -98.5795 };

  getGameFromQuery(params: ParamMap): Observable<IEvent> {
    const eventId = params.get('eventId') ?? params.get('gameId') ?? '';
    const parsedGameId = Number(params.get('gameId'));
    const gameId = Number.isFinite(parsedGameId) ? parsedGameId : undefined;
    const gameName = params.get('gameName') ?? 'Away Team @ Home Team';
    const venueName = params.get('location') ?? params.get('venueName') ?? 'Venue TBD';
    const league = this.parseLeague(params.get('league'));

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
    const dateTime = game.dateTime ?? new Date();

    return of([
      {
        eventId: `${game.eventId || 'game'}-tailgate`,
        gameId: game.gameId,
        eventType: EventTypeEnum.Tailgate,
        eventName: `${game.eventName} Tailgate`,
        dateTime: new Date(dateTime.getTime() - 2 * 60 * 60 * 1000),
        location: { lat: game.location.lat + 0.005, lng: game.location.lng - 0.004 },
        venueName: `${game.venueName} - Lot A`,
        imageUrl: '/assets/tailgate.png',
        league: game.league,
        isUserCreated: false,
        isSaved: false,
      },
      {
        eventId: `${game.eventId || 'game'}-watch`,
        gameId: game.gameId,
        eventType: EventTypeEnum.Watch,
        eventName: `${game.eventName} Watch Party`,
        dateTime: new Date(dateTime.getTime() - 90 * 60 * 1000),
        location: { lat: game.location.lat - 0.006, lng: game.location.lng + 0.003 },
        venueName: `${game.venueName} - Fan Zone`,
        imageUrl: '/assets/tailgate.png',
        league: game.league,
        isUserCreated: true,
        isSaved: true,
      },
      {
        eventId: `${game.eventId || 'game'}-postgame`,
        gameId: game.gameId,
        eventType: EventTypeEnum.Postgame,
        eventName: `${game.eventName} Postgame Meetup`,
        dateTime: new Date(dateTime.getTime() + 3 * 60 * 60 * 1000),
        location: { lat: game.location.lat + 0.004, lng: game.location.lng + 0.005 },
        venueName: `${game.venueName} - Downtown`,
        imageUrl: '/assets/tailgate.png',
        league: game.league,
        isUserCreated: false,
        isSaved: false,
      },
    ]);
  }

  getSafetyAlerts(game: IEvent): Observable<ISafetyAlert[]> {
    return of([
      {
        alertId: `${game.eventId || 'game'}-alert-1`,
        severity: 'Medium',
        title: 'Heavy Traffic Near Main Entrance',
        description: 'Allow extra time. Rideshare drop-off is moved 2 blocks east.',
        dateTime: new Date(),
        location: { lat: game.location.lat + 0.003, lng: game.location.lng - 0.002 },
        gameDate: game.dateTime,
        latitude: game.location.lat + 0.003,
        longitude: game.location.lng - 0.002,
      },
      {
        alertId: `${game.eventId || 'game'}-alert-2`,
        severity: 'Low',
        title: 'Large Pedestrian Crowds',
        description: 'Use designated crosswalks around Gate C and stay in lit areas.',
        dateTime: new Date(),
        location: { lat: game.location.lat - 0.004, lng: game.location.lng + 0.004 },
        gameDate: game.dateTime,
        latitude: game.location.lat - 0.004,
        longitude: game.location.lng + 0.004,
      },
    ]);
  }

  private parseLeague(leagueValue: string | null): LeagueEnum | undefined {
    if (!leagueValue) {
      return undefined;
    }

    const validLeague = Object.values(LeagueEnum).find((value) => value === leagueValue);
    return validLeague as LeagueEnum | undefined;
  }
}
