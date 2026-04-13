import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPlaceCategoryFilters, PlaceCategory } from '../../../../shared/models/place-category';

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
  @Input() placeCategoryFilters: IPlaceCategoryFilters = {
    restaurant: true,
    bar: true,
    hotel: true,
  };

  @Output() toggleGameOverlay = new EventEmitter<void>();
  @Output() toggleEventOverlay = new EventEmitter<void>();
  @Output() toggleSafetyOverlay = new EventEmitter<void>();
  @Output() togglePlaceCategory = new EventEmitter<PlaceCategory>();

  onToggleGameOverlay(): void {
    this.toggleGameOverlay.emit();
  }

  onToggleEventOverlay(): void {
    this.toggleEventOverlay.emit();
  }

  onToggleSafetyOverlay(): void {
    this.toggleSafetyOverlay.emit();
  }

  onTogglePlaceCategory(category: PlaceCategory): void {
    this.togglePlaceCategory.emit(category);
  }
}
