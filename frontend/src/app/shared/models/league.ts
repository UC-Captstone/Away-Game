import { LeagueEnum } from './league-enum';

export interface ILeague {
  leagueID: string; // UUID
  leagueName: LeagueEnum;
}
