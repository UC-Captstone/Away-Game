import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { catchError, forkJoin, of } from 'rxjs';
import { MapComponent } from '../../../shared/components/map/map.component';
import { IMapViewportBounds } from '../../../shared/models/map-viewport-bounds';
import { MapHeaderComponent } from '../components/map-header/map-header.component';
import { MapSidebarComponent } from '../components/map-sidebar/map-sidebar.component';
import { EventTypeEnum } from '../../../shared/models/event-type-enum';
import { IEvent } from '../../../shared/models/event';
import { ILocation } from '../../../shared/models/location';
import { IMapMarker } from '../../../shared/models/map-marker';
import { IPlaceCategoryFilters, PlaceCategory } from '../../../shared/models/place-category';
import { IPlace } from '../../../shared/models/place';
import { ISafetyAlert } from '../../../shared/models/safety-alert';
import { EventsService } from '../../../shared/services/events.service';
import {
  GeolocationService,
  LocationFallbackReason,
} from '../../../shared/services/geolocation.service';
import { PlacesService } from '../../../shared/services/places.service';
import { SafetyAlertService } from '../../../shared/services/safety-alert.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  standalone: true,
  imports: [CommonModule, MapComponent, MapHeaderComponent, MapSidebarComponent],
})
export class MapPageComponent implements OnInit {
  private readonly searchRadiusMiles = 100;
  private readonly placesSearchRadiusMiles = 10;
  private readonly safetyAlertFetchLimit = 200;
  private readonly placesFetchLimit = 150;
  private readonly maxPlaceMarkers = 45;
  private readonly defaultCenter: ILocation = { lat: 39.1031, lng: -84.512 };
  private readonly gameMarkerIcon: L.Icon = this.createCircleMarkerIcon('#f59e0b');
  private readonly eventMarkerIcon: L.Icon = this.createCircleMarkerIcon('#22c55e');
  private readonly safetyMarkerIcon: L.Icon = this.createCircleMarkerIcon('#ef4444');
  private readonly placeMarkerIcons: Record<PlaceCategory, L.Icon> = {
    restaurant: this.createCircleMarkerIcon('#fde047'),
    bar: this.createCircleMarkerIcon('#7c3aed'),
    hotel: this.createCircleMarkerIcon('#06b6d4'),
  };

  isLoading: WritableSignal<boolean> = signal(false);
  userLocation: WritableSignal<ILocation> = signal(this.defaultCenter);
  currentViewport: WritableSignal<IMapViewportBounds | null> = signal(null);

  allNearbyEvents: WritableSignal<IEvent[]> = signal([]);
  allSafetyAlerts: WritableSignal<ISafetyAlert[]> = signal([]);
  allNearbyPlaces: WritableSignal<IPlace[]> = signal([]);
  cappedNearbyPlaces: WritableSignal<IPlace[]> = signal([]);

  visibleEvents: WritableSignal<IEvent[]> = signal([]);
  mapMarkers: WritableSignal<IMapMarker[]> = signal([]);

  showGameOverlay: WritableSignal<boolean> = signal(true);
  showEventOverlay: WritableSignal<boolean> = signal(true);
  showSafetyOverlay: WritableSignal<boolean> = signal(true);
  placeCategoryFilters: WritableSignal<IPlaceCategoryFilters> = signal({
    restaurant: true,
    bar: true,
    hotel: true,
  });
  locationNotice: WritableSignal<string | null> = signal(null);

  constructor(
    private readonly router: Router,
    private readonly eventsService: EventsService,
    private readonly geolocationService: GeolocationService,
    private readonly safetyAlertService: SafetyAlertService,
    private readonly placesService: PlacesService,
  ) {}

  ngOnInit(): void {
    this.loadMapData();
  }

  onViewportChanged(bounds: IMapViewportBounds): void {
    this.currentViewport.set(bounds);
    this.refreshVisibleEvents();
  }

  onToggleGameOverlay(): void {
    this.showGameOverlay.set(!this.showGameOverlay());
    this.refreshMapMarkers();
    this.refreshVisibleEvents();
  }

  onToggleEventOverlay(): void {
    this.showEventOverlay.set(!this.showEventOverlay());
    this.refreshMapMarkers();
    this.refreshVisibleEvents();
  }

  onToggleSafetyOverlay(): void {
    this.showSafetyOverlay.set(!this.showSafetyOverlay());
    this.refreshMapMarkers();
  }

  onTogglePlaceCategory(category: PlaceCategory): void {
    const nextFilters: IPlaceCategoryFilters = {
      ...this.placeCategoryFilters(),
      [category]: !this.placeCategoryFilters()[category],
    };
    this.placeCategoryFilters.set(nextFilters);
    this.refreshMapMarkers();
  }

  openEventDetails(event: IEvent): void {
    if (event.eventType === EventTypeEnum.Game) {
      this.router.navigate(['/game-details'], {
        queryParams: {
          eventId: event.eventId,
          gameId: event.gameId,
          gameName: event.eventName,
          venueName: event.venueName,
          dateTime: event.dateTime,
          lat: event.location?.lat,
          lng: event.location?.lng,
          homeLogo: event.teamLogos?.home ?? '',
          awayLogo: event.teamLogos?.away ?? '',
          league: event.league ?? '',
          saved: event.isSaved,
        },
      });
      return;
    }

    this.router.navigate(['/event-details'], {
      queryParams: {
        eventId: event.eventId,
        eventName: event.eventName,
        description: event.description ?? '',
        eventType: event.eventType,
        venueName: event.venueName,
        location: event.venueName,
        dateTime: event.dateTime,
        lat: event.location?.lat,
        lng: event.location?.lng,
        imageUrl: event.imageUrl ?? '',
        league: event.league ?? '',
        isUserCreated: event.isUserCreated ?? false,
        saved: event.isSaved,
      },
    });
  }

  private loadMapData(): void {
    this.isLoading.set(true);

    this.geolocationService.getRealLocationAttempt().subscribe({
      next: (locationResult) => {
        if (locationResult.source === 'fallback') {
          this.locationNotice.set(this.getLocationNotice(locationResult.reason));
          return;
        }

        this.locationNotice.set(null);

        const current = this.userLocation();
        const isSameLocation =
          Math.abs(current.lat - locationResult.location.lat) < 0.001 &&
          Math.abs(current.lng - locationResult.location.lng) < 0.001;

        if (!isSameLocation) {
          this.userLocation.set(locationResult.location);
          this.loadDataForLocation(locationResult.location);
        }
      },
      error: () => {
        this.locationNotice.set(this.getLocationNotice('unknown'));
      },
    });

    this.geolocationService.getUserLocation().subscribe({
      next: (location) => {
        this.userLocation.set(location);
        this.loadDataForLocation(location);
      },
      error: () => {
        this.userLocation.set(this.defaultCenter);
        this.locationNotice.set(this.getLocationNotice('unknown'));
        this.isLoading.set(false);
      },
    });
  }

  private loadDataForLocation(location: ILocation): void {
    forkJoin({
      events: this.eventsService.getNearbyEventDetails(location, this.searchRadiusMiles, 100).pipe(
        catchError((error) => {
          console.warn('Failed to load nearby events:', error);
          return of([]);
        }),
      ),
      safetyAlerts: this.safetyAlertService
        .listAlerts(undefined, undefined, true, this.safetyAlertFetchLimit, 0)
        .pipe(
          catchError((error) => {
            console.warn('Failed to load safety alerts:', error);
            return of([]);
          }),
        ),
      places: this.placesService
        .getNearbyPlaces(
          location,
          this.milesToMeters(this.placesSearchRadiusMiles),
          this.placesFetchLimit,
          this.getAllPlaceCategories(),
        )
        .pipe(
          catchError((error) => {
            console.warn('Failed to load nearby places:', error);
            return of([]);
          }),
        ),
    }).subscribe({
      next: ({ events, safetyAlerts, places }) => {
        this.allNearbyEvents.set(events);
        this.allSafetyAlerts.set(this.filterNearbySafetyAlerts(safetyAlerts, location));
        this.allNearbyPlaces.set(places);
        this.cappedNearbyPlaces.set(this.getInitialCappedPlaces(places, location));
        this.refreshMapMarkers();
        this.refreshVisibleEvents();
        this.isLoading.set(false);
      },
      error: () => {
        this.allNearbyEvents.set([]);
        this.allSafetyAlerts.set([]);
        this.allNearbyPlaces.set([]);
        this.cappedNearbyPlaces.set([]);
        this.mapMarkers.set([]);
        this.visibleEvents.set([]);
        this.isLoading.set(false);
      },
    });
  }

  private getLocationNotice(reason: LocationFallbackReason | null): string {
    switch (reason) {
      case 'permission-denied':
        return 'Location access is off. Showing a default map area. Enable location services for nearby results.';
      case 'unsupported':
        return 'Location services are unavailable on this device. Showing a default map area.';
      case 'timeout':
      case 'position-unavailable':
        return 'Unable to get your current location right now. Showing a default map area.';
      default:
        return 'Using a default map area until location becomes available.';
    }
  }

  private refreshMapMarkers(): void {
    const markers: IMapMarker[] = [];

    this.getOverlayFilteredEvents().forEach((event) => {
      if (!this.hasEventCoordinates(event)) {
        return;
      }

      markers.push({
        lat: event.location!.lat,
        lng: event.location!.lng,
        popup: `<b>${event.eventName}</b><br><small>${event.eventType}</small>`,
        icon: this.isGameEvent(event) ? this.gameMarkerIcon : this.eventMarkerIcon,
        navigation: this.buildNavigationForEvent(event),
      });
    });

    if (this.showSafetyOverlay()) {
      this.allSafetyAlerts().forEach((alert) => {
        if (alert.latitude == null || alert.longitude == null) {
          return;
        }

        markers.push({
          lat: alert.latitude,
          lng: alert.longitude,
          popup: `<b>Safety: ${alert.title}</b><br><small>${alert.severity}</small>`,
          icon: this.safetyMarkerIcon,
        });
      });
    }

    this.getOverlayFilteredPlaces().forEach((place) => {
      markers.push({
        lat: place.location.lat,
        lng: place.location.lng,
        popup: `<b>${place.name}</b><br><small>${place.categoryLabel ?? this.formatPlaceCategory(place.category)}</small>${place.address ? `<br><small>${place.address}</small>` : ''}`,
        icon: this.placeMarkerIcons[place.category],
      });
    });

    this.mapMarkers.set(markers);
  }

  private refreshVisibleEvents(): void {
    const bounds = this.currentViewport();
    const events = this.getOverlayFilteredEvents();

    if (!bounds) {
      this.visibleEvents.set(this.sortEventsByDate(events));
      return;
    }

    const eventsInView = events.filter((event) => {
      const lat = event.location?.lat;
      const lng = event.location?.lng;

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return false;
      }

      return this.isInBounds(lat, lng, bounds);
    });

    this.visibleEvents.set(this.sortEventsByDate(eventsInView));
  }

  private filterNearbySafetyAlerts(alerts: ISafetyAlert[], center: ILocation): ISafetyAlert[] {
    return alerts.filter((alert) => {
      if (alert.latitude == null || alert.longitude == null) {
        return false;
      }

      return (
        this.distanceMiles(center, { lat: alert.latitude, lng: alert.longitude }) <=
        this.searchRadiusMiles
      );
    });
  }

  private sortEventsByDate(events: IEvent[]): IEvent[] {
    return [...events].sort((a, b) => {
      const aTime = new Date(a.dateTime).getTime();
      const bTime = new Date(b.dateTime).getTime();
      return aTime - bTime;
    });
  }

  private hasEventCoordinates(event: IEvent): boolean {
    const lat = event.location?.lat;
    const lng = event.location?.lng;
    return Number.isFinite(lat) && Number.isFinite(lng);
  }

  private getOverlayFilteredEvents(): IEvent[] {
    return this.allNearbyEvents().filter((event) => {
      if (this.isGameEvent(event)) {
        return this.showGameOverlay();
      }

      return this.showEventOverlay();
    });
  }

  private getOverlayFilteredPlaces(): IPlace[] {
    const filters = this.placeCategoryFilters();

    return this.cappedNearbyPlaces().filter((place) => {
      const searchableText = `${place.name} ${place.categoryLabel ?? ''}`.toLowerCase();

      switch (place.category) {
        case 'restaurant':
          return (
            filters.restaurant &&
            this.containsAnyKeyword(searchableText, ['restaurant', 'restuarant'])
          );
        case 'bar':
          return filters.bar && this.containsAnyKeyword(searchableText, ['bar']);
        case 'hotel':
          return filters.hotel;
      }
    });
  }

  private containsAnyKeyword(value: string, keywords: string[]): boolean {
    return keywords.some((keyword) => value.includes(keyword));
  }

  private getInitialCappedPlaces(places: IPlace[], origin: ILocation): IPlace[] {
    if (places.length <= this.maxPlaceMarkers) {
      return [...places].sort(
        (a, b) => this.getPlaceDistanceMiles(a, origin) - this.getPlaceDistanceMiles(b, origin),
      );
    }

    return [...places]
      .sort((a, b) => this.getPlaceDistanceMiles(a, origin) - this.getPlaceDistanceMiles(b, origin))
      .slice(0, this.maxPlaceMarkers);
  }

  private getAllPlaceCategories(): PlaceCategory[] {
    return ['restaurant', 'bar', 'hotel'];
  }

  private getPlaceDistanceMiles(place: IPlace, origin: ILocation): number {
    if (Number.isFinite(place.distanceMeters)) {
      return (place.distanceMeters as number) / 1609.34;
    }

    return this.distanceMiles(origin, place.location);
  }

  private formatPlaceCategory(category: PlaceCategory): string {
    switch (category) {
      case 'restaurant':
        return 'Restaurant';
      case 'bar':
        return 'Bar';
      case 'hotel':
        return 'Hotel';
    }
  }

  private isGameEvent(event: IEvent): boolean {
    return (event.eventType ?? '').trim().toLowerCase() === EventTypeEnum.Game.toLowerCase();
  }

  private buildNavigationForEvent(event: IEvent): IMapMarker['navigation'] {
    if (this.isGameEvent(event)) {
      return {
        path: '/game-details',
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
      };
    }

    return {
      path: '/event-details',
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
    };
  }

  private isInBounds(lat: number, lng: number, bounds: IMapViewportBounds): boolean {
    const withinLat = lat >= bounds.south && lat <= bounds.north;

    if (bounds.west <= bounds.east) {
      return withinLat && lng >= bounds.west && lng <= bounds.east;
    }

    return withinLat && (lng >= bounds.west || lng <= bounds.east);
  }

  private createCircleMarkerIcon(colorHex: string): L.Icon {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="11" fill="${colorHex}" stroke="#e2e8f0" stroke-width="3" />
      </svg>
    `;

    return L.icon({
      iconUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });
  }

  private distanceMiles(from: ILocation, to: ILocation): number {
    const earthRadiusMiles = 3958.8;
    const dLat = this.toRadians(to.lat - from.lat);
    const dLng = this.toRadians(to.lng - from.lng);
    const lat1 = this.toRadians(from.lat);
    const lat2 = this.toRadians(to.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    return 2 * earthRadiusMiles * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private toRadians(value: number): number {
    return (value * Math.PI) / 180;
  }

  private milesToMeters(value: number): number {
    return Math.round(value * 1609.34);
  }
}
