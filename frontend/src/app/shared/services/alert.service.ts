import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAlertType } from '../models/alert-type';
import { ISafetyAlert } from '../models/safety-alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private http: HttpClient) {}

  getAlertTypes(): Observable<IAlertType[]> {
    return this.http.get<IAlertType[]>(`${environment.apiUrl}/alert-types`);
  }

  getAlertHistory(limit: number = 200): Observable<ISafetyAlert[]> {
    return this.http.get<ISafetyAlert[]>(`${environment.apiUrl}/safety-alerts/history`, {
      params: new HttpParams().set('limit', limit.toString()),
    });
  }
}
