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
  @Output() savedToggled: EventEmitter<{ eventID: string; status: boolean }> = new EventEmitter<{
    eventID: string;
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
    this.savedToggled.emit({ eventID: this.eventTile.eventID, status: this.eventTile.isSaved });
  }
}
