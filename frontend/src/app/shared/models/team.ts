import { ILeague } from './league';

export interface ITeam {
  teamId: number; // espn id
  league: ILeague;
  sportConference?: string;
  sportDivision?: string;
  homeLocation: string;
  teamName: string;
  displayName: string;
  logoUrl: string;
}
