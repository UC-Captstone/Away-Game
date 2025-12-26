import { Injectable } from '@angular/core';
import { IUserProfile } from '../models/user-profile';
import { IHeaderInfo } from '../models/header';
import { IChatMessage } from '../../community/models/chat-message';
import { LeagueEnum } from '../../../shared/models/league-enum';
import { IVerificationForm } from '../models/verification-form';
import { catchError, delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { handleError } from '../../../shared/helpers/error-handler';
import { IAccountSettings } from '../models/account-settings';
import { EventTypeEnum } from '../../../shared/models/event-type-enum';
import { IEvent } from '../../events/models/event';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  // Nathan
  // hardcoded user profile data for development purposes
  // fix later to fetch from backend API
  getUserProfile(): Observable<IUserProfile> {
    return this.http
      .get<IUserProfile>(`${this.apiUrl}/users/me/profile`, { withCredentials: true })
      .pipe(catchError(handleError));
  }

  submitVerificationApplication(form: IVerificationForm): Observable<null> {
    console.log('Submitting verification application:', form);
    // Nathan: Logic to submit verification application to backend API can be added here
    return of(null).pipe(delay(1000));

    //return this.http.post<null>(`${this.apiUrl}/user/verify`, form).pipe(catchError(handleError));
  }

  deleteUserAccount(): Observable<null> {
    return this.http
      .delete<null>(`${this.apiUrl}/users/me/account`)
      .pipe(catchError(handleError));
  }

  updateUserPassword(newPassword: string): void {
    console.log('Updating user password...');
    // Nathan: Logic to update user password via clerk
  }

  updateFavoriteTeams(teamIds: number[]): Observable<null> {
    // Convert string IDs to numbers for backend
    //const teamIds = teamIds.map(id => parseInt(id, 10));
    
    return this.http
      .put<null>(`${this.apiUrl}/users/me/favorite-teams`, { teamIds })
      .pipe(catchError(handleError));
  }

  updateAccountInfo(updatedInfo: IAccountSettings): Observable<null> {
    return this.http
      .patch<null>(`${this.apiUrl}/users/me/account-settings`, updatedInfo)
      .pipe(catchError(handleError));
  }

  deleteSavedEvent(eventID: string): Observable<IEvent[]> {
    return this.http
      .delete<IEvent[]>(`${this.apiUrl}/users/me/saved-events/${eventID}`)
      .pipe(catchError(handleError));
  }
}
