import { ITeam } from '../../../shared/models/team';

export interface IHeaderInfo {
  profilePictureUrl?: string;
  userName: string;
  displayName: string;
  isVerified: boolean;
  favoriteTeams: ITeam[];
}
