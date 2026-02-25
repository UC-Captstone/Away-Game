import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEvent } from '../../models/event';
import { UserProfileService } from '../../../features/user-profile/services/user-profile.service';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-event-tile',
  templateUrl: './event-tile.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class EventTileComponent {
  @Input() event!: IEvent;
  @Input() showSavedIcon: boolean = true;
  @Output() removedFromSaved: EventEmitter<string> = new EventEmitter<string>();

  isSaving: boolean = false;

  constructor(private userProfileService: UserProfileService) {}

  navigateToEventDetails(event: Event) {
    event.preventDefault();
    // Nathan: Implement navigation logic here
    console.log('Navigating to event details for event:', this.event);
  }

  toggleSaved(event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (this.isSaving) {
      return;
    }

    const previousStatus = this.event.isSaved;
    const nextStatus = !previousStatus;
    this.event.isSaved = nextStatus;
    this.isSaving = true;

    this.getSaveRequest(nextStatus)
      .pipe()
      .subscribe({
        next: () => {
          this.isSaving = false;
          if (!nextStatus) {
            this.removedFromSaved.emit(this.event.eventId);
          }
        },
        error: (error) => {
          console.error('Error toggling saved event:', error);
          this.event.isSaved = previousStatus;
        },
      });
  }

  private getSaveRequest(nextStatus: boolean): Observable<IEvent[]> {
    return nextStatus
      ? this.userProfileService.addSavedEvent(this.event.eventId)
      : this.userProfileService.deleteSavedEvent(this.event.eventId);
  }
}
