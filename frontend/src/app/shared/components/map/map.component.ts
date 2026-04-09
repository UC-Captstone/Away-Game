import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ILocation } from '../../models/location';
import { IMapMarker } from '../../models/map-marker';
import { IMapViewportBounds } from '../../models/map-viewport-bounds';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'block h-full min-h-0 w-full',
  },
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  @Input() center!: ILocation;
  @Input() zoom: number = 12;
  @Input() events: IMapMarker[] = [];
  @Input() height: string = '300px';
  @Input() showUserMarker: boolean = true;
  @Input() fitBoundsToMarkers: boolean = false;
  @Input() fillContainer: boolean = false;
  @Input() minZoom: number = 4;
  @Input() maxZoom: number = 19;
  @Input() maxBounds: [[number, number], [number, number]] = [
    [15, -170],
    [72, -50],
  ];
  @Output() mapClicked = new EventEmitter<ILocation>();
  @Output() viewportChanged = new EventEmitter<IMapViewportBounds>();

  isMapReady: WritableSignal<boolean> = signal(false);

  private map?: L.Map;
  private markerLayer?: L.LayerGroup;
  private markerInstances: L.Marker[] = [];
  private resizeObserver?: ResizeObserver;

  // Custom icon definitions
  private readonly userIcon = L.icon({
    iconUrl: 'assets/location-pin-blue.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  private readonly eventIcon = L.icon({
    iconUrl: 'assets/location-pin-orange.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  constructor(
    private ngZone: NgZone,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.center) {
      console.error('Map center coordinates are required');
    }
  }

  ngAfterViewInit(): void {
    if (!this.mapContainer?.nativeElement) {
      console.error('Map container not found');
      return;
    }

    if (!this.center) {
      console.error('Map center is required before initialization');
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.initializeMap();
      this.observeContainerResize();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;

    this.invalidateMapSize();

    if (changes['center'] && this.center) {
      this.map.setView([this.center.lat, this.center.lng], this.zoom);
      this.updateEvents(this.events);
    }

    if (changes['zoom'] && this.zoom && this.map) {
      this.map.setZoom(this.zoom);
    }

    if (changes['minZoom'] && this.map) {
      this.map.setMinZoom(this.minZoom);
    }

    if (changes['maxZoom'] && this.map) {
      this.map.setMaxZoom(this.maxZoom);
    }

    if (changes['maxBounds'] && this.map) {
      this.map.setMaxBounds(this.maxBounds as L.LatLngBoundsExpression);
      this.map.panInsideBounds(this.maxBounds as L.LatLngBoundsExpression);
    }

    if (changes['events'] || changes['showUserMarker']) {
      this.updateEvents(this.events);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();

    if (this.map) {
      this.map.remove();
    }
  }

  updateEvents(newEvents: IMapMarker[]): void {
    if (!this.markerLayer) return;

    this.ngZone.runOutsideAngular(() => {
      this.markerLayer!.clearLayers();
      this.markerInstances = [];

      if (this.showUserMarker && this.center) {
        this.addUserMarker();
      }

      this.events = newEvents || [];
      this.addEventMarkers();

      if (this.fitBoundsToMarkers && this.markerInstances.length > 0) {
        this.adjustZoomToFitMarkers();
      }
    });
  }

  private initializeMap(): void {
    try {
      if (this.map) {
        this.map.remove();
      }

      const mapElement = this.mapContainer.nativeElement as HTMLDivElement & {
        _leaflet_id?: number;
      };
      if (mapElement._leaflet_id) {
        delete mapElement._leaflet_id;
      }

      this.map = L.map(this.mapContainer.nativeElement, {
        center: [this.center.lat, this.center.lng],
        zoom: this.zoom,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        maxBounds: this.maxBounds,
        maxBoundsViscosity: 1,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);

      this.markerLayer = L.layerGroup().addTo(this.map);

      this.map.on('click', (event: L.LeafletMouseEvent) => {
        this.ngZone.run(() => {
          this.mapClicked.emit({
            lat: event.latlng.lat,
            lng: event.latlng.lng,
          });
        });
      });

      const onViewportEvent = () => {
        this.ngZone.run(() => {
          this.emitViewportBounds();
        });
      };

      this.map.on('moveend', onViewportEvent);
      this.map.on('zoomend', onViewportEvent);

      if (this.showUserMarker) {
        this.addUserMarker();
      }

      this.addEventMarkers();

      if (this.fitBoundsToMarkers && this.markerInstances.length > 0) {
        this.adjustZoomToFitMarkers();
      }

      this.invalidateMapSize();

      this.ngZone.run(() => {
        this.isMapReady.set(true);
        this.emitViewportBounds();
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private emitViewportBounds(): void {
    if (!this.map) {
      return;
    }

    const bounds = this.map.getBounds();
    this.viewportChanged.emit({
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest(),
    });
  }

  private invalidateMapSize(): void {
    setTimeout(() => this.map?.invalidateSize(), 0);
    setTimeout(() => this.map?.invalidateSize(), 150);
  }

  private observeContainerResize(): void {
    if (!this.mapContainer?.nativeElement) {
      return;
    }

    this.resizeObserver?.disconnect();
    this.resizeObserver = new ResizeObserver(() => {
      this.invalidateMapSize();
    });
    this.resizeObserver.observe(this.mapContainer.nativeElement);
  }

  private addUserMarker(): void {
    if (!this.map || !this.markerLayer || !this.center) return;

    const userMarker = L.marker([this.center.lat, this.center.lng], {
      icon: this.userIcon,
    });

    userMarker.addTo(this.markerLayer).bindPopup('<b>You are here</b>').openPopup();

    this.markerInstances.push(userMarker);
  }

  private addEventMarkers(): void {
    if (!this.map || !this.markerLayer) return;

    this.events.forEach((event) => {
      const leafletMarker = L.marker([event.lat, event.lng], {
        icon: event.icon || this.eventIcon,
      });

      if (event.popup) {
        leafletMarker.bindPopup(
          event.navigation ? this.buildInteractivePopupContent(event.popup) : event.popup,
        );
      }

      if (event.navigation) {
        leafletMarker.on('popupopen', () => {
          const popupRoot = leafletMarker.getPopup()?.getElement();
          const tappableDescription = popupRoot?.querySelector('.js-popup-description');

          if (!tappableDescription) {
            return;
          }

          tappableDescription.addEventListener(
            'click',
            (clickEvent) => {
              clickEvent.preventDefault();
              clickEvent.stopPropagation();

              this.ngZone.run(() => {
                this.router.navigate([event.navigation!.path], {
                  queryParams: event.navigation!.queryParams,
                });
              });
            },
            { once: true },
          );
        });
      }

      leafletMarker.addTo(this.markerLayer!);
      this.markerInstances.push(leafletMarker);
    });
  }

  private buildInteractivePopupContent(content: string): string {
    return `
      <button
        type="button"
        class="js-popup-description"
        style="display:block;width:100%;border:0;background:transparent;padding:0;text-align:left;cursor:pointer;"
        aria-label="Open details"
      >
        ${content}
      </button>
    `;
  }

  private adjustZoomToFitMarkers(): void {
    if (!this.map || this.markerInstances.length === 0) return;

    try {
      const group = new L.FeatureGroup(this.markerInstances);
      this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
    } catch (error) {
      console.warn('Could not fit bounds to markers:', error);
    }
  }
}
