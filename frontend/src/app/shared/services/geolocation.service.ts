import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { ILocation } from '../models/location';
import { catchError, map, Observable, of } from 'rxjs';

export type LocationFallbackReason =
  | 'permission-denied'
  | 'position-unavailable'
  | 'timeout'
  | 'unsupported'
  | 'unknown';

export interface ILocationResolution {
  location: ILocation;
  source: 'gps' | 'fallback';
  reason: LocationFallbackReason | null;
}

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private readonly STORAGE_KEY = 'userLocation';
  private readonly LOCATION_TIMEOUT = 5000;
  readonly DEFAULT_LOCATION: ILocation = { lat: 39.1031, lng: -84.512 }; // Cincinnati, OH

  /**
   * Returns the best available stored location (cached from session storage,
   * or the default location if none is cached).
   * Call `getRealLocation()` if you need to request the current browser location.
   */
  getUserLocation(): Observable<ILocation> {
    const cachedLocation = this.getLocationFromStorage();
    return of(cachedLocation ?? this.DEFAULT_LOCATION);
  }

  /**
   * Requests the real browser location. Emits once if granted, completes or
   * errors silently. Subscribe alongside getUserLocation() to get an update.
   */
  getRealLocation(): Observable<ILocation> {
    return this.getRealLocationAttempt().pipe(map((result) => result.location));
  }

  getRealLocationAttempt(): Observable<ILocationResolution> {
    return this.requestBrowserGeolocation().pipe(
      map((location) => {
        this.saveLocationToStorage(location);
        return {
          location,
          source: 'gps' as const,
          reason: null,
        };
      }),
      catchError((error) => {
        const reason = this.resolveFallbackReason(error);
        console.warn('Geolocation failed:', error);
        return of({
          location: this.DEFAULT_LOCATION,
          source: 'fallback' as const,
          reason,
        });
      }),
    );
  }

  private requestBrowserGeolocation(): Observable<ILocation> {
    return new Observable<ILocation>((observer) => {
      if (Capacitor.isNativePlatform()) {
        Geolocation.getCurrentPosition({
          enableHighAccuracy: false,
          timeout: this.LOCATION_TIMEOUT,
          maximumAge: 300000,
        })
          .then((position) => {
            observer.next({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            observer.complete();
          })
          .catch((error) => {
            observer.error(error);
          });
        return;
      }

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

  private resolveFallbackReason(error: unknown): LocationFallbackReason {
    if (typeof error === 'string') {
      return error.toLowerCase().includes('not supported') ? 'unsupported' : 'unknown';
    }

    const code = (error as { code?: number } | null)?.code;
    if (code === 1) {
      return 'permission-denied';
    }
    if (code === 2) {
      return 'position-unavailable';
    }
    if (code === 3) {
      return 'timeout';
    }

    return 'unknown';
  }
}
