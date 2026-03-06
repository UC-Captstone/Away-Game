import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEvent } from '../../models/event';
import { Router } from '@angular/router';
import { EventTypeEnum } from '../../models/event-type-enum';
import { SavedEventsService } from '../../services/saved-events.service';

@Component({
  selector: 'app-event-tile',
  templateUrl: './event-tile.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class EventTileComponent {
  @Input() event!: IEvent;
  @Input() showSavedIcon: boolean = true;
  isSaving: WritableSignal<boolean> = signal(false);

  constructor(
    private router: Router,
    private savedEventsService: SavedEventsService,
  ) {}

  navigateToEventDetails(event: Event) {
    event.preventDefault();

    if (this.event.eventType === EventTypeEnum.Game) {
      this.router.navigate(['/game-details'], {
        queryParams: {
          eventId: this.event.eventId,
          gameId: this.event.gameId ?? undefined,
          gameName: this.event.eventName,
          venueName: this.event.venueName,
          dateTime: this.event.dateTime,
          lat: this.event.location?.lat,
          lng: this.event.location?.lng,
          homeLogo: this.event.teamLogos?.home ?? '',
          awayLogo: this.event.teamLogos?.away ?? '',
          league: this.event.league ?? '',
          saved: this.event.isSaved,
        },
      });
      return;
    }

    console.log('Event tile clicked (non-game event):', this.event);
  }

  toggleSaved(event?: Event): void {
    if (this.isSaving()) {
      return;
    }

    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const previousSavedState = this.event.isSaved;
    this.isSaving.set(true);
    this.event.isSaved = !previousSavedState;

    const request$ = this.event.isSaved
      ? this.savedEventsService.addSavedEvent(this.event.eventId)
      : this.savedEventsService.deleteSavedEvent(this.event.eventId);

    request$.subscribe({
      next: (savedEvents) => {
        this.event.isSaved = savedEvents.some((item) => item.eventId === this.event.eventId);
        this.isSaving.set(false);
      },
      error: () => {
        this.event.isSaved = previousSavedState;
        this.isSaving.set(false);
      },
    });
  }
}
