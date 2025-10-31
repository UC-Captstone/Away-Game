import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClerkService } from '@jsrob/ngx-clerk';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';

//Nathan: fill out later / reference .env
const API_URL = environment.apiUrl + '/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private clerkService = inject(ClerkService);
  private http = inject(HttpClient);

  syncUser(): Observable<void> {
    const session = this.clerkService.session();

    if (!session || !session.id) {
      throw new Error('User not authenticated.');
    }

    return from(session.getToken({ template: 'default' }) ?? Promise.resolve(null)).pipe(
      switchMap((token) => {
        if (!token) throw new Error('Failed to retrieve token');
        const headers = this.getAuthHeaders(token);
        return this.http.post<void>(`${API_URL}/sync`, {}, { headers });
      }),
    );
  }

  private getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }
}
