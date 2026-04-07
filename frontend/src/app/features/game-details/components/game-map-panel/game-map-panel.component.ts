import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, signal, WritableSignal } from '@angular/core';
import { ILocation } from '../../../../shared/models/location';
import { IMapMarker } from '../../../../shared/models/map-marker';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { ISafetyAlert } from '../../../../shared/models/safety-alert';
import * as L from 'leaflet';
import { IEvent } from '../../../../shared/models/event';
import { EventTypeEnum } from '../../../../shared/models/event-type-enum';

@Component({
  selector: 'app-game-map-panel',
  templateUrl: './game-map-panel.component.html',
  standalone: true,
  imports: [CommonModule, MapComponent],
  host: {
    class: 'block h-full min-h-0',
  },
})
export class GameMapPanelComponent {
  @Input() game: IEvent | null = null;
  @Input() gameEvents: IEvent[] = [];
  @Input() safetyAlerts: ISafetyAlert[] = [];
  @Input() center: ILocation = { lat: 39.8283, lng: -98.5795 };
  private readonly venueMarkerIcon: L.Icon = this.createCircleMarkerIcon('#38bdf8');
  private readonly eventMarkerIcon: L.Icon = this.createCircleMarkerIcon('#f59e0b');
  private readonly safetyMarkerIcon: L.Icon = this.createCircleMarkerIcon('#ef4444');
  markers: WritableSignal<IMapMarker[]> = signal([]);
  showEventOverlay: WritableSignal<boolean> = signal(true);
  showSafetyOverlay: WritableSignal<boolean> = signal(true);
  showVenueOverlay: WritableSignal<boolean> = signal(true);

  ngOnChanges(_: SimpleChanges): void {
    this.refreshMapMarkers();
  }

  onToggleEventOverlay(): void {
    this.showEventOverlay.set(!this.showEventOverlay());
    this.refreshMapMarkers();
  }

  onToggleSafetyOverlay(): void {
    this.showSafetyOverlay.set(!this.showSafetyOverlay());
    this.refreshMapMarkers();
  }

  onToggleVenueOverlay(): void {
    this.showVenueOverlay.set(!this.showVenueOverlay());
    this.refreshMapMarkers();
  }

  private refreshMapMarkers(): void {
    if (!this.game) {
      this.markers.set([]);
      return;
    }

    const markers: IMapMarker[] = [];

    if (this.showVenueOverlay()) {
      markers.push({
        lat: this.game.location.lat,
        lng: this.game.location.lng,
        popup: `<b>${this.game.venueName}</b><br><small>Game venue</small>`,
        icon: this.venueMarkerIcon,
      });
    }

    if (this.showEventOverlay()) {
      this.gameEvents.forEach((event) => {
        markers.push({
          lat: event.location.lat,
          lng: event.location.lng,
          popup: `<b>${event.eventName}</b><br><small>${event.eventType}</small>`,
          icon: this.eventMarkerIcon,
          navigation: this.buildNavigationForEvent(event),
        });
      });
    }

    if (this.showSafetyOverlay()) {
      this.safetyAlerts.forEach((alert) => {
        if (alert.latitude != null && alert.longitude != null) {
          markers.push({
            lat: alert.latitude,
            lng: alert.longitude,
            popup: `<b>Safety: ${alert.title}</b><br><small>${alert.severity}</small>`,
            icon: this.safetyMarkerIcon,
          });
        }
      });
    }

    this.markers.set(markers);
  }

  private buildNavigationForEvent(event: IEvent): IMapMarker['navigation'] {
    const isGame = (event.eventType ?? '').trim().toLowerCase() === EventTypeEnum.Game.toLowerCase();

    if (isGame) {
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
}
