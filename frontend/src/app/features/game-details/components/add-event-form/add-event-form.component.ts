import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventTypeEnum } from '../../../../shared/models/event-type-enum';
import { IAddEventFormSubmission } from '../../../../shared/models/add-event-form-submission';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { ILocation } from '../../../../shared/models/location';
import { IMapMarker } from '../../../../shared/models/map-marker';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MapComponent],
})
export class AddEventFormComponent implements OnInit {
  @Input() gameId!: number;
  @Input() gameDateTime: Date | string | null = null;
  @Input() initialCenter: ILocation = { lat: 39.8283, lng: -98.5795 };
  @Input() isSubmitting = false;
  @Input() errorMessage = '';

  @Output() submitted = new EventEmitter<IAddEventFormSubmission>();
  @Output() cancelled = new EventEmitter<void>();

  title = '';
  description = '';
  selectedTime = '';
  eventType: EventTypeEnum = EventTypeEnum.Tailgate;
  mapCenter: ILocation = { lat: 39.8283, lng: -98.5795 };
  selectedLocation: ILocation = { lat: 39.8283, lng: -98.5795 };
  selectionMarker: IMapMarker[] = [];

  readonly eventTypeOptions: EventTypeEnum[] = Object.values(EventTypeEnum).filter(
    (eventType) => eventType !== EventTypeEnum.Game,
  );

  ngOnInit(): void {
    const gameDate = this.getGameDate();
    this.selectedTime = this.formatTimeForInput(gameDate);

    this.mapCenter = {
      lat: this.initialCenter.lat,
      lng: this.initialCenter.lng,
    };

    this.selectedLocation = {
      lat: this.initialCenter.lat,
      lng: this.initialCenter.lng,
    };

    this.selectionMarker = [
      {
        lat: this.selectedLocation.lat,
        lng: this.selectedLocation.lng,
        popup: 'Selected event location',
      },
    ];
  }

  onMapClicked(location: ILocation): void {
    this.selectedLocation = location;
    this.selectionMarker = [
      {
        lat: location.lat,
        lng: location.lng,
        popup: 'Selected event location',
      },
    ];
  }

  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }

    if (!this.title.trim() || !this.selectedTime || !this.eventType || this.gameId == null) {
      return;
    }

    const dateTime = this.buildDateTimeFromGameDateAndTime();
    if (!dateTime) {
      return;
    }

    this.submitted.emit({
      title: this.title.trim(),
      description: this.description.trim() || null,
      eventType: this.eventType,
      dateTime,
      gameId: this.gameId,
      latitude: this.selectedLocation.lat,
      longitude: this.selectedLocation.lng,
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  private getGameDate(): Date {
    const parsed = this.gameDateTime ? new Date(this.gameDateTime) : new Date();
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  private formatTimeForInput(value: Date): string {
    const hours = value.getHours().toString().padStart(2, '0');
    const minutes = value.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private buildDateTimeFromGameDateAndTime(): string | null {
    const [hoursRaw, minutesRaw] = this.selectedTime.split(':');
    const hours = Number(hoursRaw);
    const minutes = Number(minutesRaw);

    if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
      return null;
    }

    const gameDate = this.getGameDate();
    const year = gameDate.getFullYear();
    const month = (gameDate.getMonth() + 1).toString().padStart(2, '0');
    const day = gameDate.getDate().toString().padStart(2, '0');
    const hh = hours.toString().padStart(2, '0');
    const mm = minutes.toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hh}:${mm}`;
  }
}
