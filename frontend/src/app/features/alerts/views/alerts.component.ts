import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ISafetyAlert, SafetyAlertSeverity } from '../../../shared/models/safety-alert';
import { environment } from '../../../../environments/environment';

interface IAlertType {
  code: string;
  typeName: string;
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AlertsComponent implements OnInit {
  allAlerts: WritableSignal<ISafetyAlert[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  alertTypes: WritableSignal<IAlertType[]> = signal([]);

  searchTerm: WritableSignal<string> = signal('');
  filterSeverity: WritableSignal<SafetyAlertSeverity | ''> = signal('');
  filterType: WritableSignal<string> = signal('');
  filterOfficial: WritableSignal<'all' | 'official' | 'community'> = signal('all');

  filteredAlerts = computed(() => {
    let alerts = this.allAlerts();
    const severity = this.filterSeverity();
    const type = this.filterType();
    const official = this.filterOfficial();
    const term = this.searchTerm().trim().toLowerCase();

    if (severity) alerts = alerts.filter(a => a.severity === severity);
    if (type) alerts = alerts.filter(a => a.alertTypeId.toLowerCase() === type.toLowerCase());
    if (official === 'official') alerts = alerts.filter(a => a.isOfficial);
    else if (official === 'community') alerts = alerts.filter(a => !a.isOfficial);
    if (term) alerts = alerts.filter(a => a.title.toLowerCase().includes(term));
    return alerts;
  });

  hasActiveFilters = computed(() =>
    !!this.filterSeverity() || !!this.filterType() || this.filterOfficial() !== 'all' || !!this.searchTerm().trim()
  );

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<IAlertType[]>(`${environment.apiUrl}/alert-types`).subscribe({
      next: (types) => this.alertTypes.set(types),
    });
    this.load();
  }

  load(): void {
    this.isLoading.set(true);
    this.http
      .get<ISafetyAlert[]>(`${environment.apiUrl}/safety-alerts/history`, {
        params: new HttpParams().set('limit', '200'),
      })
      .subscribe({
        next: (alerts) => {
          this.allAlerts.set(alerts);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.filterSeverity.set('');
    this.filterType.set('');
    this.filterOfficial.set('all');
  }

  severityClass(severity: string): string {
    if (severity === 'high') return 'bg-red-500/15 text-red-300 border-red-500/30';
    if (severity === 'medium') return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  }
}
