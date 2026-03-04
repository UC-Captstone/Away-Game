import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, signal, WritableSignal } from '@angular/core';
import { IEvent } from '../../../features/events/models/event';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-details-header',
  templateUrl: './details-header.component.html',
  standalone: true,
  imports: [CommonModule, DatePipe],
})
export class DetailsHeaderComponent implements OnChanges {
  @Input() event: IEvent | null = null;
  isSaved: WritableSignal<boolean> = signal(false);

  constructor(private readonly eventsService: EventsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event']) {
      this.isSaved.set(this.event?.isSaved ?? false);
    }
  }

  onSavedToggle(): void {
    if (!this.event?.eventId) {
      return;
    }

    const request$ = this.isSaved()
      ? this.eventsService.deleteSavedEvent(this.event.eventId)
      : this.eventsService.addSavedEvent(this.event.eventId);

    request$.subscribe((savedEvents) => {
      this.isSaved.set(savedEvents.some((item) => item.eventId === this.event?.eventId));
    });
  }
}
