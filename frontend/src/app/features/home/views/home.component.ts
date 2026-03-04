import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { SearchBarComponent } from '../components/search-bar.component';
import { IEvent } from '../../../shared/models/event';
import { MapComponent } from '../../../shared/components/map/map.component';
import { ILocation } from '../../../shared/models/location';
import { GeolocationService } from '../../../shared/services/geolocation.service';
import { interval, Subscription, switchMap } from 'rxjs';
import { EventTileComponent } from '../../../shared/components/event-tile/event-tile.component';
import { IMapMarker } from '../../../shared/models/map-marker';
import { EventService } from '../../../shared/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [SearchBarComponent, EventTileComponent, MapComponent],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Separate loading states so featured events and nearby events render independently.
  isFeaturedLoading: WritableSignal<boolean> = signal(false);
  isNearbyLoading: WritableSignal<boolean> = signal(false);
  userLocation: WritableSignal<ILocation | null> = signal(null);
  nearbyEvents: WritableSignal<IMapMarker[]> = signal([]);
  featuredEvents: WritableSignal<IEvent[]> = signal([]);
  currentEventIndex: WritableSignal<number> = signal(0);

  private rotationSubscription?: Subscription;

  constructor(
    private eventService: EventService,
    private geolocationService: GeolocationService,
  ) {}

  ngOnInit(): void {
    this._loadFeaturedEvents();
    this._loadNearbyEvents();
  }

  /** Load featured events independently — page shows as soon as these arrive. */
  private _loadFeaturedEvents(): void {
    console.time('[Home] featured events');
    this.isFeaturedLoading.set(true);

    this.eventService.getFeaturedEvents().subscribe({
      next: (events) => {
        console.timeEnd('[Home] featured events');
        this.featuredEvents.set(events);
        this.isFeaturedLoading.set(false);
        if (events.length > 1) {
          this.startAutoRotate();
        }
      },
      error: (error) => {
        console.timeEnd('[Home] featured events');
        console.error('Error fetching featured events:', error);
        this.isFeaturedLoading.set(false);
      },
    });
  }

  /** Load geolocation + nearby events independently — map fills in when ready. */
  private _loadNearbyEvents(): void {
    // Show map immediately with cached or default location — no waiting.
    const initialLocation = this.geolocationService.getUserLocation();

    initialLocation.pipe(
      switchMap((location) => {
        this.userLocation.set(location);
        this.isNearbyLoading.set(true);
        console.time('[Home] nearby events');
        return this.eventService.getNearbyEvents(location);
      }),
    ).subscribe({
      next: (nearbyEvents) => {
        console.timeEnd('[Home] nearby events');
        this.nearbyEvents.set(nearbyEvents);
        this.isNearbyLoading.set(false);
      },
      error: (error) => {
        console.timeEnd('[Home] nearby events');
        console.error('Error fetching nearby events:', error);
        this.isNearbyLoading.set(false);
      },
    });

    // In the background, try to get the real GPS location.
    // If it differs from what we already used, refresh nearby events quietly.
    this.geolocationService.getRealLocation().subscribe({
      next: (realLocation) => {
        const current = this.userLocation();
        const isSame =
          current &&
          Math.abs(current.lat - realLocation.lat) < 0.001 &&
          Math.abs(current.lng - realLocation.lng) < 0.001;

        if (!isSame) {
          this.userLocation.set(realLocation);
          this.eventService.getNearbyEvents(realLocation).subscribe({
            next: (nearbyEvents) => this.nearbyEvents.set(nearbyEvents),
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    if (this.rotationSubscription) {
      this.rotationSubscription.unsubscribe();
    }
  }

  private startAutoRotate(): void {
    this.rotationSubscription = interval(3000).subscribe(() => {
      const nextIndex = (this.currentEventIndex() + 1) % this.featuredEvents().length;
      this.currentEventIndex.set(nextIndex);
    });
  }
}
