import { Injectable } from '@angular/core';
import { IUserProfile } from '../models/user-profile';
import { IVerificationForm } from '../models/verification-form';
import { catchError, from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { handleError } from '../../../shared/helpers/error-handler';
import { IAccountSettings } from '../models/account-settings';
import { IEvent } from '../../../shared/models/event';
import { environment } from '../../../../environments/environment';
import { ClerkService } from '@jsrob/ngx-clerk';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = environment.apiUrl + '/users/me';

  constructor(
    private http: HttpClient,
    private clerkService: ClerkService,
  ) {}

  getUserProfile(): Observable<IUserProfile> {
    return this.http
      .get<IUserProfile>(`${this.apiUrl}/profile`, { withCredentials: true })
      .pipe(catchError(handleError));
  }

  submitVerificationApplication(form: IVerificationForm): Observable<null> {
    return this.http.post<null>(`${this.apiUrl}/verify`, form).pipe(catchError(handleError));
  }

  deleteUserAccount(): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/account`).pipe(catchError(handleError));
  }

  updateUserPassword(currentPassword: string, newPassword: string): Observable<void> {
    const user = this.clerkService.clerk()?.user;
    if (!user) {
      return new Observable((obs) => obs.error(new Error('No authenticated user')));
    }
    return from(
      user.updatePassword({ currentPassword, newPassword, signOutOfOtherSessions: false }),
    ) as unknown as Observable<void>;
  }

  updateFavoriteTeams(teamIds: number[]): Observable<null> {
    return this.http
      .put<null>(`${this.apiUrl}/favorite-teams`, { teamIds })
      .pipe(catchError(handleError));
  }

  updateAccountInfo(updatedInfo: IAccountSettings): Observable<null> {
    return this.http
      .patch<null>(`${this.apiUrl}/account-settings`, updatedInfo)
      .pipe(catchError(handleError));
  }

}
