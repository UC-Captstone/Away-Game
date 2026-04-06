import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-map-header',
  templateUrl: './map-header.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class MapHeaderComponent {
  @Input() showGameOverlay: boolean = true;
  @Input() showEventOverlay: boolean = true;
  @Input() showSafetyOverlay: boolean = true;
  @Input() showUserMarker: boolean = true;

  @Output() toggleGameOverlay = new EventEmitter<void>();
  @Output() toggleEventOverlay = new EventEmitter<void>();
  @Output() toggleSafetyOverlay = new EventEmitter<void>();
  @Output() toggleUserMarker = new EventEmitter<void>();

  onToggleGameOverlay(): void {
    this.toggleGameOverlay.emit();
  }

  onToggleEventOverlay(): void {
    this.toggleEventOverlay.emit();
  }

  onToggleSafetyOverlay(): void {
    this.toggleSafetyOverlay.emit();
  }

  onToggleUserMarker(): void {
    this.toggleUserMarker.emit();
  }
}
