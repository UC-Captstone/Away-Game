import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClerkService } from '@jsrob/ngx-clerk';
import { from, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserAuthResponse } from '../models/authResponse';

const API_URL = environment.apiUrl + '/auth';

const INTERNAL_JWT_STORAGE_KEY = 'ag_token';
// Refresh the internal token if it expires within this many seconds.
const TOKEN_EXPIRY_BUFFER_SECONDS = 60;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clerkService = inject(ClerkService);
  private http = inject(HttpClient);

  // Shared in-flight sync observable. Any concurrent calls while a sync
  // is already in progress will subscribe to the same observable rather
  // than each firing their own Clerk /tokens request (which costs ~900ms).
  private syncInFlight$: Observable<UserAuthResponse> | null = null;

  syncUser(): Observable<UserAuthResponse> {
    if (this.syncInFlight$) {
      return this.syncInFlight$;
    }

    const session = this.clerkService.session();

    if (!session || !session.id) {
      throw new Error('User not authenticated.');
    }

    this.syncInFlight$ = from(
      session.getToken({ template: '__session' }) ?? Promise.resolve(null),
    ).pipe(
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
      // shareReplay(1) multicasts the single result to all concurrent subscribers,
      // then the reference is cleared so the next sync gets a fresh observable.
      shareReplay(1),
    );

    // Clear the in-flight reference once it settles so future calls re-run.
    this.syncInFlight$.subscribe({
      complete: () => { this.syncInFlight$ = null; },
      error: () => { this.syncInFlight$ = null; },
    });

    return this.syncInFlight$;
  }

  getInternalToken(): string | null {
    return localStorage.getItem(INTERNAL_JWT_STORAGE_KEY);
  }

  /**
   * Returns true if there is no internal token OR the token is expired /
   * expires within TOKEN_EXPIRY_BUFFER_SECONDS. Used by the interceptor to
   * skip the backend round-trip and go straight to syncUser().
   */
  isTokenExpiredOrExpiringSoon(): boolean {
    const token = this.getInternalToken();
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiresAt: number = payload.exp ?? 0;
      const nowSeconds = Math.floor(Date.now() / 1000);
      return expiresAt - nowSeconds < TOKEN_EXPIRY_BUFFER_SECONDS;
    } catch {
      return true;
    }
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
