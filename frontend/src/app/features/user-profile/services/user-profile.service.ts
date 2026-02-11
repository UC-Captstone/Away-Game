import { Injectable } from '@angular/core';
import { IUserProfile } from '../models/user-profile';
import { IVerificationForm } from '../models/verification-form';
import { catchError, delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { handleError } from '../../../shared/helpers/error-handler';
import { IAccountSettings } from '../models/account-settings';
import { IEvent } from '../../events/models/event';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = environment.apiUrl + '/users/me';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<IUserProfile> {
    return this.http
      .get<IUserProfile>(`${this.apiUrl}/profile`, { withCredentials: true })
      .pipe(catchError(handleError));
  }

  submitVerificationApplication(form: IVerificationForm): Observable<null> {
    console.log('Submitting verification application:', form);
    // Nathan: Logic to submit verification application to backend API can be added here
    return of(null).pipe(delay(1000));

    //return this.http.post<null>(`${this.apiUrl}/user/verify`, form).pipe(catchError(handleError));
  }

  deleteUserAccount(): Observable<null> {
    return this.http.delete<null>(`${this.apiUrl}/account`).pipe(catchError(handleError));
  }

  updateUserPassword(newPassword: string): void {
    console.log('Updating user password...');
    // Nathan: Logic to update user password via clerk
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

  deleteSavedEvent(eventId: string): Observable<IEvent[]> {
    return this.http
      .delete<IEvent[]>(`${this.apiUrl}/saved-events/${eventId}`)
      .pipe(catchError(handleError));
  }
}
