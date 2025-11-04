import { ILeague } from './league';

export interface ITeam {
  teamID: string; // UUID;
  league: ILeague;
  sportLeague: string;
  sportConference?: string;
  sportDivision?: string;
  homeLocation: string;
  teamName: string;
  displayName: string;
  logoUrl: string;
}
