import { ITeam } from '../../../shared/models/team';

export interface IHeaderInfo {
  profilePictureUrl?: string;
  username: string;
  displayName: string;
  isVerified: boolean;
  favoriteTeams: ITeam[];
}
