import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafetyAlertService } from '../../../../shared/services/safety-alert.service';
import { IAlertType } from '../../../../shared/models/alert-type';
import { ISafetyAlertCreate, SafetyAlertSeverity } from '../../../../shared/models/safety-alert';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AlertFormComponent implements OnInit {
  @Input() gameId!: number;
  @Input() venueId?: number | null;
  @Input() isAdmin = false;
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

  severities: SafetyAlertSeverity[] = ['low', 'medium', 'high'];

  constructor(private safetyAlertService: SafetyAlertService) {}

  ngOnInit(): void {
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
}
