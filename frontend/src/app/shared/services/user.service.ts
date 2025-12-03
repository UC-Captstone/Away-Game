import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { INavBar } from '../models/navbar';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //Nathan: wait for merge
  //private apiUrl = environment.apiUrl + '/user' ;
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getNavBarInfo(): Observable<INavBar> {
    const navbarInfo: INavBar = {
      //profilePictureUrl: '/assets/default-avatar.jpg',
      username: 'john_doe',
      fullName: 'John Doe',
    };
    return of(navbarInfo).pipe(delay(1000));
    //return this.http.get<INavBar>(`${this.apiUrl}/navbar-info`);
  }
}
