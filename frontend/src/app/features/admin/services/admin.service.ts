import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AdminLeague, AdminOverview, AdminUser } from '../models/admin';

const API_URL = environment.apiUrl + '/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<AdminOverview> {
    return this.http.get<AdminOverview>(`${API_URL}/overview`);
  }

  getLeagues(): Observable<AdminLeague[]> {
    return this.http.get<AdminLeague[]>(`${API_URL}/leagues`);
  }

  setLeagueActive(leagueCode: string, isActive: boolean): Observable<AdminLeague> {
    return this.http.patch<AdminLeague>(
      `${API_URL}/leagues/${leagueCode}/active?is_active=${isActive}`,
      {},
    );
  }

  getPendingApprovals(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${API_URL}/pending-approvals`);
  }

  approveVerification(userId: string): Observable<AdminUser> {
    return this.http.post<AdminUser>(`${API_URL}/pending-approvals/${userId}/approve`, {});
  }

  denyVerification(userId: string): Observable<AdminUser> {
    return this.http.post<AdminUser>(`${API_URL}/pending-approvals/${userId}/deny`, {});
  }

  getVerifiedCreators(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${API_URL}/verified-creators`);
  }

  revokeCreatorStatus(userId: string): Observable<AdminUser> {
    return this.http.post<AdminUser>(`${API_URL}/verified-creators/${userId}/revoke`, {});
  }

  getAllUsers(limit = 100, offset = 0): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${API_URL}/users?limit=${limit}&offset=${offset}`);
  }

  deactivateUser(userId: string): Observable<void> {
    return this.http.post<void>(`${API_URL}/users/${userId}/deactivate`, {});
  }

  resetPassword(userId: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${API_URL}/users/${userId}/reset-password`, {
      new_password: newPassword,
    });
  }
}
