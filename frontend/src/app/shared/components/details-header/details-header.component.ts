import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, signal, WritableSignal } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { IEvent } from '../../models/event';

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

    const previousSavedState = this.event.isSaved;
    this.event.isSaved = !previousSavedState;
    this.isSaved.set(this.event.isSaved);

    const request$ = this.event.isSaved
      ? this.eventsService.addSavedEvent(this.event.eventId)
      : this.eventsService.deleteSavedEvent(this.event.eventId);

    request$.subscribe({
      next: (savedEvents) => {
        const isSaved = savedEvents.some((item) => item.eventId === this.event?.eventId);
        this.isSaved.set(isSaved);
        if (this.event) {
          this.event.isSaved = isSaved;
        }
      },
      error: () => {
        this.isSaved.set(previousSavedState);
        if (this.event) {
          this.event.isSaved = previousSavedState;
        }
      },
    });
  }
}
