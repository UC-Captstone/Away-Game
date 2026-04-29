import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClerkService } from '@jsrob/ngx-clerk';
import { from, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserAuthResponse } from '../models/authResponse';
import { TokenStorageService } from '../../../shared/services/token-storage.service';

const API_URL = environment.apiUrl + '/auth';

// Refresh the internal token if it expires within this many seconds.
const TOKEN_EXPIRY_BUFFER_SECONDS = 60;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clerkService = inject(ClerkService);
  private http = inject(HttpClient);
  private tokenStorage = inject(TokenStorageService);

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
      switchMap((resp) => {
        if (!resp?.token) {
          return of(resp);
        }
        return from(this.tokenStorage.setToken(resp.token)).pipe(map(() => resp));
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
    return this.tokenStorage.getToken();
  }

  /**
   * Returns true if there is no internal token OR the token is expired /
   * expires within TOKEN_EXPIRY_BUFFER_SECONDS. Used by the interceptor to
   * skip the backend round-trip and go straight to syncUser().
   */
  isTokenExpiredOrExpiringSoon(): boolean {
    const payload = this.decodeJwtPayload();
    if (!payload) return true;
    const expiresAt: number = (payload['exp'] as number) ?? 0;
    const nowSeconds = Math.floor(Date.now() / 1000);
    return expiresAt - nowSeconds < TOKEN_EXPIRY_BUFFER_SECONDS;
  }

  clearInternalToken(): Promise<void> {
    return this.tokenStorage.clearToken();
  }

  getUserRole(): string | null {
    const payload = this.decodeJwtPayload();
    return payload ? ((payload['role'] as string) ?? null) : null;
  }

  /** Returns the current user's internal UUID (the JWT `sub` claim), or null if not signed in. */
  getCurrentUserId(): string | null {
    const payload = this.decodeJwtPayload();
    return payload ? ((payload['sub'] as string) ?? null) : null;
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

  /** Decodes the JWT payload from the stored internal token. Returns null on any failure. */
  private decodeJwtPayload(): Record<string, unknown> | null {
    const token = this.getInternalToken();
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      // Pad to a multiple of 4 to handle base64url without padding.
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
      return JSON.parse(atob(padded)) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}
