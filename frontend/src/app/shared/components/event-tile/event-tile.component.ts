import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEvent } from '../../models/event';
import { Router } from '@angular/router';
import { EventTypeEnum } from '../../models/event-type-enum';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-tile',
  templateUrl: './event-tile.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class EventTileComponent {
  @Input() event!: IEvent;
  @Input() showSavedIcon: boolean = true;

  constructor(
    private router: Router,
    private eventsService: EventsService,
  ) {}

  navigateToEventDetails(event: Event) {
    event.preventDefault();

    if (this.event.eventType === EventTypeEnum.Game) {
      this.router.navigate(['/game-details'], {
        queryParams: {
          eventId: this.event.eventId,
          gameId: this.event.gameId ?? '',
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

  toggleSaved(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    const previousSavedState = this.event.isSaved;
    this.event.isSaved = !previousSavedState;

    const request$ = this.event.isSaved
      ? this.eventsService.addSavedEvent(this.event.eventId)
      : this.eventsService.deleteSavedEvent(this.event.eventId);

    request$.subscribe({
      next: (savedEvents) => {
        this.event.isSaved = savedEvents.some((item) => item.eventId === this.event.eventId);
      },
      error: () => {
        this.event.isSaved = previousSavedState;
      },
    });
  }
}
