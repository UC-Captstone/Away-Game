import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, signal, WritableSignal } from '@angular/core';
import { ILocation } from '../../../../shared/models/location';
import { IMapMarker } from '../../../../shared/models/map-marker';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { ISafetyAlert } from '../../../../shared/models/safety-alert';
import * as L from 'leaflet';
import { IEvent } from '../../../../shared/models/event';

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
        });
      });
    }

    if (this.showSafetyOverlay()) {
      this.safetyAlerts.forEach((alert) => {
        markers.push({
          lat: alert.location.lat,
          lng: alert.location.lng,
          popup: `<b>Safety: ${alert.title}</b><br><small>${alert.severity}</small>`,
          icon: this.safetyMarkerIcon,
        });
      });
    }

    this.markers.set(markers);
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
