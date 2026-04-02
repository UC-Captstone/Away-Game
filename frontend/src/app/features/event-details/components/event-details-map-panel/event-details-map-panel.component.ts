import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { ILocation } from '../../../../shared/models/location';
import { IMapMarker } from '../../../../shared/models/map-marker';

@Component({
  selector: 'app-event-details-map-panel',
  templateUrl: './event-details-map-panel.component.html',
  standalone: true,
  imports: [CommonModule, MapComponent],
  host: {
    class: 'block h-full min-h-0',
  },
})
export class EventDetailsMapPanelComponent {
  @Input() center: ILocation = { lat: 39.8283, lng: -98.5795 };
  @Input() markers: IMapMarker[] = [];
  @Input() showEventOverlay: boolean = true;
  @Input() showNearbyOverlay: boolean = true;
  @Input() showSafetyOverlay: boolean = true;

  @Output() toggleEventOverlay = new EventEmitter<void>();
  @Output() toggleNearbyOverlay = new EventEmitter<void>();
  @Output() toggleSafetyOverlay = new EventEmitter<void>();

  onToggleEventOverlay(): void {
    this.toggleEventOverlay.emit();
  }

  onToggleNearbyOverlay(): void {
    this.toggleNearbyOverlay.emit();
  }

  onToggleSafetyOverlay(): void {
    this.toggleSafetyOverlay.emit();
  }
}
