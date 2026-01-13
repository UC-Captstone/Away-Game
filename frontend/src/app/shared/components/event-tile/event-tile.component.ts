import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEvent } from '../../../features/events/models/event';

@Component({
  selector: 'app-event-tile',
  templateUrl: './event-tile.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class EventTileComponent {
  @Input() eventTile!: IEvent;
  @Input() showSavedIcon: boolean = true;
  @Output() savedToggled: EventEmitter<{ eventId: string; status: boolean }> = new EventEmitter<{
    eventId: string;
    status: boolean;
  }>();

  navigateToEventDetails(event: Event) {
    event.preventDefault();
    // Nathan: Implement navigation logic here
    console.log('Navigating to event details for event:', this.eventTile);
  }

  toggleSaved(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.eventTile.isSaved = !this.eventTile.isSaved;
    this.savedToggled.emit({ eventId: this.eventTile.eventId, status: this.eventTile.isSaved });
  }
}
