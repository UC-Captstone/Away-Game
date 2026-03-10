import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventTypeEnum } from '../../../../../shared/models/event-type-enum';

@Component({
  selector: 'app-event-type-filter',
  templateUrl: './event-type-filter.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class EventTypeFilterComponent {
  @Input() selectedEventTypes: EventTypeEnum[] = [];
  @Output() selectedEventTypesChange = new EventEmitter<EventTypeEnum[]>();

  readonly eventTypes = Object.values(EventTypeEnum);

  get allEventTypesSelected(): boolean {
    return this.selectedEventTypes.length === 0;
  }

  onAllEventTypesClick(event: Event): void {
    event.preventDefault();
    this.selectedEventTypes = [];
    this.selectedEventTypesChange.emit(this.selectedEventTypes);
  }

  onEventTypeClick(eventType: EventTypeEnum, event: Event): void {
    event.preventDefault();

    if (this.selectedEventTypes.includes(eventType)) {
      this.selectedEventTypes = this.selectedEventTypes.filter((item) => item !== eventType);
      this.selectedEventTypesChange.emit(this.selectedEventTypes);
      return;
    }

    this.selectedEventTypes = [...this.selectedEventTypes, eventType];

    if (this.selectedEventTypes.length === this.eventTypes.length) {
      this.selectedEventTypes = [];
    }

    this.selectedEventTypesChange.emit(this.selectedEventTypes);
  }

  isEventTypeSelected(eventType: EventTypeEnum): boolean {
    return !this.allEventTypesSelected && this.selectedEventTypes.includes(eventType);
  }
}
