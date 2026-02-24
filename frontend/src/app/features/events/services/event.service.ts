import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { IEvent } from '../models/event';
import { EventTypeEnum } from '../../../shared/models/event-type-enum';
import { ILocation } from '../../../shared/models/location';
import { IMapMarker } from '../../../shared/models/map-marker';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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
}
