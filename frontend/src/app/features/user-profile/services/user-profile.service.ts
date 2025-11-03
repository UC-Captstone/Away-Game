import { Injectable } from '@angular/core';
import { IUserProfile } from '../models/user-profile';
import { IHeaderInfo } from '../models/header';
import { IEvent } from '../../events/models/event';
import { IPost } from '../../community/models/post';

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
      isVerified: true,
      favoriteTeams: [
        {
          id: '1',
          name: 'Team A',
          logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/ari.png',
          league: 'NFL',
        },
        {
          id: '2',
          name: 'Team B',
          logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/gb.png',
          league: 'NFL',
        },
        {
          id: '3',
          name: 'Team C',
          logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png',
          league: 'NFL',
        },
        {
          id: '4',
          name: 'Team D',
          logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/atl.png',
          league: 'NFL',
        },
        {
          id: '5',
          name: 'Team E',
          logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png',
          league: 'NFL',
        },
        {
          id: '6',
          name: 'Team F',
          logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png',
          league: 'NFL',
        },
        {
          id: '7',
          name: 'Team G',
          logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/car.png',
          league: 'NFL',
        },
        {
          id: '8',
          name: 'Team H',
          logoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/chi.png',
          league: 'NFL',
        },
      ],
    };
    const accountSettings = {};
    const savedEvents: IEvent[] = [];
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
