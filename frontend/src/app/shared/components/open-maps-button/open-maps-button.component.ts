import { Component, Input } from '@angular/core';
import { ILocation } from '../../models/location';

type DevicePlatform = 'ios' | 'android' | 'desktop';

@Component({
  selector: 'app-open-maps-button',
  templateUrl: './open-maps-button.component.html',
  standalone: true,
})
export class OpenMapsButtonComponent {
  @Input() location: ILocation | null | undefined;
  @Input() venueName: string | null | undefined;
  @Input() compact = false;
  @Input() label = 'Open in Maps';

  get canOpen(): boolean {
    return this.getLocationQuery() !== null;
  }

  openMaps(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (typeof window === 'undefined') {
      return;
    }

    const query = this.getLocationQuery();
    if (!query) {
      return;
    }

    const platform = this.getPlatform();
    if (platform === 'desktop') {
      const desktopUrl = this.buildGoogleMapsUrl(query);
      const openedWindow = window.open(desktopUrl, '_blank', 'noopener,noreferrer');

      if (!openedWindow) {
        window.location.assign(desktopUrl);
      }
      return;
    }

    const shouldOpenNativeMaps = window.confirm('Open this location in your default maps app?');
    if (!shouldOpenNativeMaps) {
      return;
    }

    window.location.href = this.buildNativeMapsUrl(platform, query);
  }

  private getLocationQuery(): string | null {
    const venue = this.venueName?.trim() ?? '';
    const coordinates = this.getCoordinateString();

    if (venue && coordinates) {
      return `${venue} ${coordinates}`;
    }

    if (venue) {
      return venue;
    }

    return coordinates;
  }

  private getCoordinateString(): string | null {
    if (!this.location) {
      return null;
    }

    const { lat, lng } = this.location;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return null;
    }

    return `${lat},${lng}`;
  }

  private buildGoogleMapsUrl(query: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  private buildNativeMapsUrl(platform: Exclude<DevicePlatform, 'desktop'>, query: string): string {
    const encodedQuery = encodeURIComponent(query);
    const coordinates = this.getCoordinateString();

    if (platform === 'android') {
      return `geo:${coordinates ?? '0,0'}?q=${encodedQuery}`;
    }

    if (coordinates) {
      return `maps://?ll=${encodeURIComponent(coordinates)}&q=${encodedQuery}`;
    }

    return `maps://?q=${encodedQuery}`;
  }

  private getPlatform(): DevicePlatform {
    if (typeof navigator === 'undefined') {
      return 'desktop';
    }

    const userAgent = navigator.userAgent ?? '';
    if (/android/i.test(userAgent)) {
      return 'android';
    }

    const isIOSDevice = /iPad|iPhone|iPod/i.test(userAgent);
    const isIPadOS =
      (navigator.platform === 'MacIntel' || navigator.platform === 'Macintosh') &&
      navigator.maxTouchPoints > 1;

    if (isIOSDevice || isIPadOS) {
      return 'ios';
    }

    return 'desktop';
  }
}