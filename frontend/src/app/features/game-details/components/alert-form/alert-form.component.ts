import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafetyAlertService } from '../../../../shared/services/safety-alert.service';
import { IAlertType } from '../../../../shared/models/alert-type';
import { ISafetyAlertCreate, SafetyAlertSeverity } from '../../../../shared/models/safety-alert';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { ILocation } from '../../../../shared/models/location';
import { IMapMarker } from '../../../../shared/models/map-marker';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MapComponent],
})
export class AlertFormComponent implements OnInit {
  @Input() gameId!: number;
  @Input() venueId?: number | null;
  @Input() isAdmin = false;
  @Input() initialCenter: ILocation = { lat: 39.8283, lng: -98.5795 };
  @Output() alertCreated = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  alertTypes: IAlertType[] = [];
  isLoadingTypes = true;
  isSubmitting = false;
  errorMessage = '';

  title = '';
  description = '';
  severity: SafetyAlertSeverity = 'low';
  alertTypeId = '';
  isOfficialAlert = false;
  mapCenter: ILocation = { lat: 39.8283, lng: -98.5795 };
  selectedLocation: ILocation = { lat: 39.8283, lng: -98.5795 };
  selectionMarker: IMapMarker[] = [];

  severities: SafetyAlertSeverity[] = ['low', 'medium', 'high'];

  constructor(private safetyAlertService: SafetyAlertService) {}

  ngOnInit(): void {
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
        popup: 'Selected alert location',
      },
    ];

    this.safetyAlertService.getAlertTypes().subscribe({
      next: (types) => {
        this.alertTypes = types;
        if (types.length > 0) {
          this.alertTypeId = types[0].code;
        }
        this.isLoadingTypes = false;
      },
      error: () => {
        this.isLoadingTypes = false;
      },
    });
  }

  onSubmit(): void {
    if (!this.title.trim() || !this.alertTypeId) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const body: ISafetyAlertCreate = {
      title: this.title.trim(),
      description: this.description.trim() || null,
      severity: this.severity,
      alertTypeId: this.alertTypeId,
      gameId: this.gameId,
      venueId: this.venueId ?? null,
      isOfficial: this.isAdmin && this.isOfficialAlert,
      latitude: this.selectedLocation.lat,
      longitude: this.selectedLocation.lng,
    };

    this.safetyAlertService.createAlert(body).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.alertCreated.emit();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.detail ?? 'Failed to create alert. Please try again.';
      },
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onMapClicked(location: ILocation): void {
    this.selectedLocation = location;
    this.selectionMarker = [
      {
        lat: location.lat,
        lng: location.lng,
        popup: 'Selected alert location',
      },
    ];
  }
}
