import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatPanelComponent } from '../../../chat/chat-panel.component';
import { IEvent } from '../../../../shared/models/event';
import { EventDetailsEditDraft } from '../../../../shared/models/event-details-edit-draft';

@Component({
  selector: 'app-event-details-panel',
  templateUrl: './event-details-panel.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatPanelComponent],
  host: {
    class: 'block h-full min-h-0',
  },
})
export class EventDetailsPanelComponent {
  @Input() event: IEvent | null = null;
  @Input() eventId: string = '';
  @Input() isEditing = false;
  @Input() isOwnEvent = false;
  @Input() editDraft: EventDetailsEditDraft = {
    eventName: '',
    venueName: '',
    dateTime: '',
  };
  @Input() localEditNotice: string | null = null;
  @Input() relatedHomeName: string = 'Home Team';
  @Input() relatedAwayName: string = 'Away Team';
  @Input() relatedHomeLogo?: string;
  @Input() relatedAwayLogo?: string;

  @Output() eventNameChange = new EventEmitter<string>();
  @Output() venueNameChange = new EventEmitter<string>();
  @Output() dateTimeChange = new EventEmitter<string>();
  @Output() saveEdits = new EventEmitter<void>();
  @Output() cancelEditing = new EventEmitter<void>();
  @Output() navigateToLinkedGame = new EventEmitter<void>();

  onEventNameChanged(value: string): void {
    this.eventNameChange.emit(value);
  }

  onVenueNameChanged(value: string): void {
    this.venueNameChange.emit(value);
  }

  onDateTimeChanged(value: string): void {
    this.dateTimeChange.emit(value);
  }

  onSaveEdits(): void {
    this.saveEdits.emit();
  }

  onCancelEditing(): void {
    this.cancelEditing.emit();
  }

  onNavigateToLinkedGame(): void {
    this.navigateToLinkedGame.emit();
  }
}
