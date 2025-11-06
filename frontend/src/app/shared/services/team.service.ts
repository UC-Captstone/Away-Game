import { Injectable } from '@angular/core';
import { ITeam } from '../models/team';
import { delay, Observable, of } from 'rxjs';
import { LeagueEnum } from '../models/league-enum';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  //Nathan: remove once api is ready
  private mockTeams: ITeam[] = [
    {
      teamID: '1',
      league: { leagueID: 'nba-uuid', leagueName: LeagueEnum.NBA },
      sportLeague: 'NBA',
      homeLocation: 'Los Angeles',
      teamName: 'Lakers',
      displayName: 'Los Angeles Lakers',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
    },
    {
      teamID: '2',
      league: { leagueID: 'nba-uuid', leagueName: LeagueEnum.NBA },
      sportLeague: 'NBA',
      homeLocation: 'Boston',
      teamName: 'Celtics',
      displayName: 'Boston Celtics',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
    },

    {
      teamID: '4',
      league: { leagueID: 'nba-uuid', leagueName: LeagueEnum.NBA },
      sportLeague: 'NBA',
      homeLocation: 'Miami',
      teamName: 'Heat',
      displayName: 'Miami Heat',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png',
    },
    {
      teamID: '5',
      league: { leagueID: 'nba-uuid', leagueName: LeagueEnum.NBA },
      sportLeague: 'NBA',
      homeLocation: 'Cleveland',
      teamName: 'Cavaliers',
      displayName: 'Cleveland Cavaliers',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/cle.png',
    },
    {
      teamID: '6',
      league: { leagueID: 'nba-uuid', leagueName: LeagueEnum.NBA },
      sportLeague: 'NBA',
      homeLocation: 'Charlotte',
      teamName: 'Hornets',
      displayName: 'Charlotte Hornets',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/cha.png',
    },
    {
      teamID: '7',
      league: { leagueID: 'nba-uuid', leagueName: LeagueEnum.NBA },
      sportLeague: 'NBA',
      homeLocation: 'Chicago',
      teamName: 'Bulls',
      displayName: 'Chicago Bulls',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/chi.png',
    },
    {
      teamID: '8',
      league: { leagueID: 'nba-uuid', leagueName: LeagueEnum.NBA },
      sportLeague: 'NBA',
      homeLocation: 'Atlanta',
      teamName: 'Hawks',
      displayName: 'Atlanta Hawks',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/atl.png',
    },

    {
      teamID: '3',
      league: { leagueID: 'nfl-uuid', leagueName: LeagueEnum.NFL },
      sportLeague: 'NFL',
      homeLocation: 'Dallas',
      teamName: 'Cowboys',
      displayName: 'Dallas Cowboys',
      logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png',
    },
  ];

  getTeamsByLeague(
    leagueId: string,
    searchTerm: string = '',
    limit: number = 4,
  ): Observable<ITeam[]> {
    //Nathan: replace with real api call
    const teams = this.mockTeams.filter(
      (t) =>
        t.league.leagueID === leagueId &&
        t.displayName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Simulate network delay
    return of(teams.slice(0, limit)).pipe(delay(500));
  }
}
