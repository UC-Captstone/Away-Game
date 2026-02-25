import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { INavBar } from '../models/navbar';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl + '/users/me' ;

  constructor(private http: HttpClient) {}

  getNavBarInfo(): Observable<INavBar> {
    return this.http.get<INavBar>(`${this.apiUrl}/navbar-info`);
  }
}
