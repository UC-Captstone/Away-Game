import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafetyAlertService } from '../../../../shared/services/safety-alert.service';
import { IAlertType } from '../../../../shared/models/alert-type';
import {
  ISafetyAlert,
  ISafetyAlertUpdate,
  SafetyAlertSeverity,
} from '../../../../shared/models/safety-alert';

@Component({
  selector: 'app-my-alerts',
  templateUrl: './my-alerts.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class MyAlertsComponent implements OnInit {
  alerts: WritableSignal<ISafetyAlert[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  editingAlertId: WritableSignal<string | null> = signal(null);

  // Edit form state
  editTitle = '';
  editDescription = '';
  editSeverity: SafetyAlertSeverity = 'low';
  editAlertTypeId = '';
  editIsActive = true;
  isSaving = false;
  saveError = '';

  severities: SafetyAlertSeverity[] = ['low', 'medium', 'high'];
  alertTypes: IAlertType[] = [];

  constructor(private safetyAlertService: SafetyAlertService) {}

  ngOnInit(): void {
    this.safetyAlertService.getAlertTypes().subscribe({
      next: (types) => {
        this.alertTypes = types;
      },
      error: () => {},
    });
    this.loadMyAlerts();
  }

  loadMyAlerts(): void {
    this.isLoading.set(true);
    this.safetyAlertService.getMyAlerts().subscribe({
      next: (alerts) => {
        this.alerts.set(alerts);
        this.isLoading.set(false);
      },
      error: () => {
        this.alerts.set([]);
        this.isLoading.set(false);
      },
    });
  }

  startEdit(alert: ISafetyAlert): void {
    this.editingAlertId.set(alert.alertId);
    this.editTitle = alert.title;
    this.editDescription = alert.description ?? '';
    this.editSeverity = alert.severity;
    this.editAlertTypeId = alert.alertTypeId;
    this.editIsActive = alert.isActive;
    this.saveError = '';
  }

  cancelEdit(): void {
    this.editingAlertId.set(null);
    this.saveError = '';
  }

  saveEdit(alertId: string): void {
    if (!this.editTitle.trim()) return;

    this.isSaving = true;
    this.saveError = '';

    const update: ISafetyAlertUpdate = {
      title: this.editTitle.trim(),
      description: this.editDescription.trim() || null,
      severity: this.editSeverity,
      alertTypeId: this.editAlertTypeId,
      isActive: this.editIsActive,
    };

    this.safetyAlertService.updateAlert(alertId, update).subscribe({
      next: (updated) => {
        this.alerts.set(this.alerts().map((a) => (a.alertId === alertId ? updated : a)));
        this.editingAlertId.set(null);
        this.isSaving = false;
      },
      error: (err) => {
        this.saveError = err?.error?.detail ?? 'Failed to save. Please try again.';
        this.isSaving = false;
      },
    });
  }

  deleteAlert(alertId: string): void {
    if (!confirm('Are you sure you want to delete this alert?')) return;

    this.safetyAlertService.deleteAlert(alertId).subscribe({
      next: () => {
        this.alerts.set(this.alerts().filter((a) => a.alertId !== alertId));
      },
      error: () => {
        /* silently ignore */
      },
    });
  }
}
