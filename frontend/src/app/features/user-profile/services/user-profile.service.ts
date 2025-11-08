import { Injectable } from '@angular/core';
import { IUserProfile } from '../models/user-profile';
import { IHeaderInfo } from '../models/header';
import { IPost } from '../../community/models/post';
import { LeagueEnum } from '../../../shared/models/league-enum';
import { IEventTile } from '../../events/models/event-tile';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  // Nathan
  // hardcoded user profile data for development purposes
  // fix later to fetch from backend API
  getUserProfile(): IUserProfile {
    console.log('Fetching user profile data...');

    const headerInfo: IHeaderInfo = {
      //profilePictureUrl: 'assets/default-avatar.jpg',
      userName: 'NathanBurns3',
      displayName: 'Nathan Burns',
      isVerified: false,
      favoriteTeams: [
        {
          teamID: '1',
          league: { leagueID: 'nba-uuid', leagueName: LeagueEnum.NBA },
          homeLocation: 'Los Angeles',
          teamName: 'Lakers',
          displayName: 'Los Angeles Lakers',
          logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
        },
        {
          teamID: '2',
          league: { leagueID: 'nba-uuid', leagueName: LeagueEnum.NBA },
          homeLocation: 'Boston',
          teamName: 'Celtics',
          displayName: 'Boston Celtics',
          logoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
        },
        {
          teamID: '3',
          league: { leagueID: 'nfl-uuid', leagueName: LeagueEnum.NFL },
          homeLocation: 'Dallas',
          teamName: 'Cowboys',
          displayName: 'Dallas Cowboys',
          logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png',
        },
      ],
    };
    const accountSettings = {
      firstName: 'Nathan',
      lastName: 'Burns',
      email: 'nathan.burns@example.com',
      appliedForVerification: false,
      enableNearbyEventNotifications: true,
      enableFavoriteTeamNotifications: true,
      enableSafetyAlertNotifications: false,
    };
    const savedEvents: IEventTile[] = [];
    const myPosts: IPost[] = [];

    const userProfile: IUserProfile = {
      headerInfo,
      savedEvents,
      myPosts,
      accountSettings,
    };
    return userProfile;
  }
}
