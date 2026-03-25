import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAlertType } from '../models/alert-type';
import { ISafetyAlert, ISafetyAlertCreate, ISafetyAlertUpdate } from '../models/safety-alert';

@Injectable({
  providedIn: 'root',
})
export class SafetyAlertService {
  private apiUrl = `${environment.apiUrl}/safety-alerts`;

  constructor(private http: HttpClient) {}

  getAlertTypes(): Observable<IAlertType[]> {
    return this.http.get<IAlertType[]>(`${environment.apiUrl}/alert-types`);
  }

  getAlertHistory(limit: number = 200): Observable<ISafetyAlert[]> {
    return this.http.get<ISafetyAlert[]>(`${this.apiUrl}/history`, {
      params: new HttpParams().set('limit', limit.toString()),
    });
  }

  listAlerts(
    gameId?: number,
    source?: string,
    activeOnly: boolean = true,
    limit: number = 50,
    offset: number = 0,
  ): Observable<ISafetyAlert[]> {
    let params = new HttpParams()
      .set('active_only', activeOnly.toString())
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    if (gameId != null) {
      params = params.set('game_id', gameId.toString());
    }
    if (source) {
      params = params.set('source', source);
    }

    return this.http.get<ISafetyAlert[]>(this.apiUrl, { params });
  }

  getAlert(alertId: string): Observable<ISafetyAlert> {
    return this.http.get<ISafetyAlert>(`${this.apiUrl}/${alertId}`);
  }

  createAlert(body: ISafetyAlertCreate): Observable<ISafetyAlert> {
    return this.http.post<ISafetyAlert>(this.apiUrl, body);
  }

  updateAlert(alertId: string, body: ISafetyAlertUpdate): Observable<ISafetyAlert> {
    return this.http.patch<ISafetyAlert>(`${this.apiUrl}/${alertId}`, body);
  }

  deleteAlert(alertId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${alertId}`);
  }

  acknowledgeAlert(alertId: string): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${this.apiUrl}/${alertId}/acknowledge`, {});
  }

  acknowledgeAll(): Observable<{ detail: string }> {
    return this.http.post<{ detail: string }>(`${this.apiUrl}/acknowledge-all`, {});
  }

  getUnacknowledgedAlerts(): Observable<ISafetyAlert[]> {
    return this.http.get<ISafetyAlert[]>(`${this.apiUrl}/unacknowledged`);
  }

  getMyAlerts(): Observable<ISafetyAlert[]> {
    return this.http.get<ISafetyAlert[]>(`${this.apiUrl}/mine`);
  }
}
