import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ILocation } from '../../models/location';
import { IMapMarker } from '../../models/map-marker';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  @Input() center!: ILocation;
  @Input() zoom: number = 12;
  @Input() events: IMapMarker[] = [];
  @Input() height: string = '300px';
  @Input() showUserMarker: boolean = true;
  @Input() fitBoundsToMarkers: boolean = false;

  isMapReady: WritableSignal<boolean> = signal(false);

  private map?: L.Map;
  private markerLayer?: L.LayerGroup;
  private markerInstances: L.Marker[] = [];

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

  constructor(private ngZone: NgZone) {}

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
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) return;

    if (changes['center'] && this.center) {
      this.map.setView([this.center.lat, this.center.lng], this.zoom);
      this.updateEvents(this.events);
    }

    if (changes['zoom'] && this.zoom && this.map) {
      this.map.setZoom(this.zoom);
    }

    if (changes['events'] || changes['showUserMarker']) {
      this.updateEvents(this.events);
    }
  }

  ngOnDestroy(): void {
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
      this.map = L.map(this.mapContainer.nativeElement, {
        center: [this.center.lat, this.center.lng],
        zoom: this.zoom,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.map);

      this.markerLayer = L.layerGroup().addTo(this.map);

      if (this.showUserMarker) {
        this.addUserMarker();
      }

      this.addEventMarkers();

      if (this.fitBoundsToMarkers && this.markerInstances.length > 0) {
        this.adjustZoomToFitMarkers();
      }

      setTimeout(() => this.map?.invalidateSize(), 0);

      this.ngZone.run(() => {
        this.isMapReady.set(true);
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
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
        leafletMarker.bindPopup(event.popup);
      }

      leafletMarker.addTo(this.markerLayer!);
      this.markerInstances.push(leafletMarker);
    });
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
