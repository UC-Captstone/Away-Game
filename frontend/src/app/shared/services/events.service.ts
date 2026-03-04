import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { handleError } from '../helpers/error-handler';
import { IEvent } from '../models/event';

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	private readonly apiUrl = environment.apiUrl + '/users/me/saved-events';

	constructor(private readonly http: HttpClient) {}

	addSavedEvent(eventId: string): Observable<IEvent[]> {
		return this.http.post<IEvent[]>(`${this.apiUrl}/${eventId}`, {}).pipe(catchError(handleError));
	}

	deleteSavedEvent(eventId: string): Observable<IEvent[]> {
		return this.http.delete<IEvent[]>(`${this.apiUrl}/${eventId}`).pipe(catchError(handleError));
	}
}
