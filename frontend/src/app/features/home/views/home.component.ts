import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { SearchBarComponent } from '../components/search-bar.component';
import { IEvent } from '../../events/models/event';
import { EventService } from '../../events/services/event.service';
import { MapComponent } from '../../../shared/components/map/map.component';
import { ILocation } from '../../../shared/models/location';
import { GeolocationService } from '../../../shared/services/geolocation.service';
import { finalize, forkJoin, interval, map, of, Subscription, switchMap, tap } from 'rxjs';
import { EventTileComponent } from '../../../shared/components/event-tile/event-tile.component';
import { IMapMarker } from '../../../shared/models/map-marker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [SearchBarComponent, EventTileComponent, MapComponent],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading: WritableSignal<boolean> = signal(false);
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
    console.log('Home component initializing...');
    this.isLoading.set(true);

    forkJoin({
      events: this.eventService.getFeaturedEvents(),
      location: this.geolocationService.getUserLocation(),
    })
      .pipe(
        tap(({ events, location }) => {
          console.log('forkJoin result:', { events, location });
        }),
        switchMap(({ events, location }: { events: IEvent[]; location: ILocation | null }) => {
          this.featuredEvents.set(events);
          this.userLocation.set(location);

          if (events.length > 1) {
            this.startAutoRotate();
          }

          if (!location) {
            return of({ nearbyEvents: null });
          }

          return this.eventService
            .getNearbyEvents(location)
            .pipe(map((nearbyEvents) => ({ nearbyEvents })));
        }),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: ({ nearbyEvents }) => {
          if (nearbyEvents) {
            this.nearbyEvents.set(nearbyEvents);
          }
        },
        error: (error) => {
          console.error('Error during initialization:', error);
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
