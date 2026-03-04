import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClerkService } from '@jsrob/ngx-clerk';
import { from, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserAuthResponse } from '../models/authResponse';

const API_URL = environment.apiUrl + '/auth';

const INTERNAL_JWT_STORAGE_KEY = 'ag_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clerkService = inject(ClerkService);
  private http = inject(HttpClient);

  syncUser(): Observable<UserAuthResponse> {
    const session = this.clerkService.session();

    if (!session || !session.id) {
      throw new Error('User not authenticated.');
    }

    return from(session.getToken({ template: '__session' }) ?? Promise.resolve(null)).pipe(
      switchMap((token) => {
        if (!token) throw new Error('Failed to retrieve token');
        const headers = this.getAuthHeaders(token);
        return this.http.post<UserAuthResponse>(`${API_URL}/sync`, {}, { headers });
      }),
      tap((resp) => {
        if (resp?.token) {
          localStorage.setItem(INTERNAL_JWT_STORAGE_KEY, resp.token);
        }
      }),
    );
  }

  getInternalToken(): string | null {
    return localStorage.getItem(INTERNAL_JWT_STORAGE_KEY);
  }

  clearInternalToken(): void {
    localStorage.removeItem(INTERNAL_JWT_STORAGE_KEY);
  }

  getUserRole(): string | null {
    const token = this.getInternalToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  private getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
