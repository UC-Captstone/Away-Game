import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { IEvent } from '../models/event';
import { EventTypeEnum } from '../../../shared/models/event-type-enum';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  getFeaturedEvents(): Observable<IEvent[]> {
    const featuredEvents: IEvent[] = [
      {
        eventID: '1',
        eventType: EventTypeEnum.Tailgate,
        eventName: 'Sample Tailgate Event',
        dateTime: new Date('2024-10-15T18:00:00Z'),
        location: 'Sample Stadium Parking Lot',
        imageUrl: '/assets/tailgate.png',
        isSaved: false,
      },
      {
        eventID: '2',
        eventType: EventTypeEnum.Game,
        eventName: 'Sample Game Event',
        dateTime: new Date('2024-11-20T20:00:00Z'),
        location: 'Sample Arena',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png',
          away: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
        },
        isSaved: true,
      },
      {
        eventID: '3',
        eventType: EventTypeEnum.Game,
        eventName: 'Another Game Event',
        dateTime: new Date('2024-12-05T19:30:00Z'),
        location: 'Another Stadium',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png',
          away: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
        },
        isSaved: false,
      },
      {
        eventID: '4',
        eventType: EventTypeEnum.Tailgate,
        eventName: 'Another Tailgate Event',
        dateTime: new Date('2024-09-10T17:00:00Z'),
        location: 'Another Stadium Parking Lot',
        imageUrl: '/assets/tailgate2.png',
        isSaved: true,
      },
    ];

    // Nathan: Placeholder for actual HTTP request
    return of(featuredEvents).pipe(delay(1000));
  }
}
