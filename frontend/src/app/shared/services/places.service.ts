import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ILocation } from '../models/location';
import { IPlaceApiResponse } from '../models/place-api-response';
import { PlaceCategory } from '../models/place-category';
import { IPlace } from '../models/place';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private readonly placesApiUrl = environment.apiUrl + '/places';

  constructor(private readonly http: HttpClient) {}

  getNearbyPlaces(
    location: ILocation,
    radiusMeters: number,
    limit: number,
    categories: PlaceCategory[],
  ): Observable<IPlace[]> {
    const safeLimit = Math.max(4, Math.min(limit, 80));
    const safeRadius = Math.max(500, Math.min(radiusMeters, 50000));

    return this.http
      .get<IPlaceApiResponse[]>(`${this.placesApiUrl}/nearby`, {
        params: {
          lat: location.lat.toString(),
          lng: location.lng.toString(),
          radius: safeRadius.toString(),
          limit: safeLimit.toString(),
          categories: categories.join(','),
        },
      })
      .pipe(
        map((places) =>
          places.filter(
            (place) =>
              Number.isFinite(place.location?.lat) &&
              Number.isFinite(place.location?.lng) &&
              typeof place.name === 'string' &&
              place.name.trim().length > 0,
          ),
        ),
      );
  }
}
