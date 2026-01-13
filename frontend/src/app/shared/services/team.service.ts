import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ITeam } from '../models/team';
import { Observable } from 'rxjs';
import { LeagueEnum } from '../models/league-enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = `${environment.apiUrl}/teams`;

  constructor(private http: HttpClient) {}

  getTeamsByLeague(
    leagueEnum: LeagueEnum,
    searchTerm: string = '',
    limit: number = 4,
  ): Observable<ITeam[]> {
    let params = new HttpParams()
      .set('league_id', leagueEnum)
      .set('limit', limit.toString());

    if (searchTerm && searchTerm.length >= 3) {
      params = params.set('search', searchTerm);
    }

    return this.http.get<ITeam[]>(this.apiUrl, { params });
  }

  getTeamById(teamId: number): Observable<ITeam> {
    return this.http.get<ITeam>(`${this.apiUrl}/${teamId}`);
  }
}
