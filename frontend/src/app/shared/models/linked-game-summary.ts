import { ILinkedGameTeam } from './linked-game-team';

export interface ILinkedGameSummary {
  gameId: number;
  homeTeam?: ILinkedGameTeam;
  awayTeam?: ILinkedGameTeam;
  leagueName?: string;
  venueName?: string;
  dateTime?: string;
  lat?: number;
  lng?: number;
}
