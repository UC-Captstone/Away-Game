import { Injectable } from '@angular/core';
import { ILocation } from '../models/location';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private readonly STORAGE_KEY = 'userLocation';
  private readonly LOCATION_TIMEOUT = 10000; // 10 seconds
  private readonly DEFAULT_LOCATION: ILocation = { lat: 39.1031, lng: -84.512 }; // Cincinnati, OH

  /*
    Get the user location from browser geolocation API.
    Returns cached location from sessionStorage if available.
    Falls back to default location if browser geolocation fails.
  */
  getUserLocation(): Observable<ILocation> {
    const cachedLocation = this.getLocationFromStorage();
    if (cachedLocation) {
      return of(cachedLocation);
    }

    return this.requestBrowserGeolocation().pipe(
      map((location) => {
        this.saveLocationToStorage(location);
        return location;
      }),
      catchError((error) => {
        console.warn('Geolocation failed, using default location:', error);
        return of(this.DEFAULT_LOCATION);
      }),
    );
  }

  private requestBrowserGeolocation(): Observable<ILocation> {
    return new Observable<ILocation>((observer) => {
      if (
        typeof window === 'undefined' ||
        typeof navigator === 'undefined' ||
        !('geolocation' in navigator)
      ) {
        observer.error('Geolocation not supported');
        return;
      }

      const timeoutId = window.setTimeout(() => {
        observer.error(new Error('Geolocation request timeout'));
      }, this.LOCATION_TIMEOUT);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          observer.next({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          observer.complete();
        },
        (error) => {
          clearTimeout(timeoutId);
          observer.error(error);
        },
        {
          enableHighAccuracy: false,
          timeout: this.LOCATION_TIMEOUT,
          maximumAge: 300000, // 5 minutes
        },
      );

      return () => clearTimeout(timeoutId);
    });
  }

  private saveLocationToStorage(location: ILocation): void {
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(location));
    } catch (error) {
      console.warn('Failed to save location to storage:', error);
    }
  }

  private getLocationFromStorage(): ILocation | null {
    try {
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to retrieve location from storage:', error);
      return null;
    }
  }
}
