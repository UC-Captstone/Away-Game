import { Injectable } from '@angular/core';
import { IUserProfile } from '../models/user-profile';
import { IHeaderInfo } from '../models/header';
import { IChatMessage } from '../../community/models/chat-message';
import { LeagueEnum } from '../../../shared/models/league-enum';
import { IVerificationForm } from '../models/verification-form';
import { catchError, delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { handleError } from '../../../shared/helpers/error-handler';
import { IAccountSettings } from '../models/account-settings';
import { EventTypeEnum } from '../../../shared/models/event-type-enum';
import { IEvent } from '../../events/models/event';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  //Nathan: wait for merge
  //private apiUrl = environment.apiUrl;
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  // Nathan
  // hardcoded user profile data for development purposes
  // fix later to fetch from backend API
  getUserProfile(): Observable<IUserProfile> {
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
    const savedEvents: IEvent[] = [
      {
        eventID: 'event-uuid-1',
        eventType: EventTypeEnum.Game,
        eventName: 'Lakers vs. Celtics',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'Staples Center, Los Angeles, CA',
        imageUrl: 'assets/events/lakers-celtics.jpg',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
          away: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
        },
        league: LeagueEnum.NBA,
        isUserCreated: false,
        isSaved: true,
      },
      {
        eventID: 'event-uuid-2',
        eventType: EventTypeEnum.Game,
        eventName: 'Cowboys vs. Giants',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'AT&T Stadium, Arlington, TX',
        imageUrl: 'assets/events/cowboys-giants.jpg',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png',
          away: 'https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png',
        },
        league: LeagueEnum.NFL,
        isUserCreated: false,
        isSaved: true,
      },
      {
        eventID: 'event-uuid-3',
        eventType: EventTypeEnum.Meetup,
        eventName: 'Warriors Meetup',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'Chase Center, San Francisco, CA',
        isUserCreated: true,
        isSaved: true,
      },
      {
        eventID: 'event-uuid-4',
        eventType: EventTypeEnum.Game,
        eventName: 'Warriors vs. Nets',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'Chase Center, San Francisco, CA',
        imageUrl: 'assets/events/warriors-nets.jpg',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/nba/500/gsw.png',
          away: 'https://a.espncdn.com/i/teamlogos/nba/500/bkn.png',
        },
        league: LeagueEnum.NBA,
        isUserCreated: false,
        isSaved: true,
      },
      {
        eventID: 'event-uuid-5',
        eventType: EventTypeEnum.Tailgate,
        eventName: 'Giants Tailgate Party',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'Chase Center, San Francisco, CA',
        isUserCreated: true,
        isSaved: true,
      },
      {
        eventID: 'event-uuid-6',
        eventType: EventTypeEnum.Game,
        eventName: 'Bulls vs. Heat',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'United Center, Chicago, IL',
        imageUrl: 'assets/events/bulls-heat.jpg',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/nba/500/chi.png',
          away: 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png',
        },
        league: LeagueEnum.NBA,
        isUserCreated: false,
        isSaved: true,
      },
      {
        eventID: 'event-uuid-7',
        eventType: EventTypeEnum.WatchParty,
        eventName: 'Super Bowl Watch Party',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'Downtown Sports Bar, New York, NY',
        isUserCreated: true,
        isSaved: true,
      },
      {
        eventID: 'event-uuid-8',
        eventType: EventTypeEnum.Game,
        eventName: 'Packers vs. Bears',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'Lambeau Field, Green Bay, WI',
        imageUrl: 'assets/events/packers-bears.jpg',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/nfl/500/gb.png',
          away: 'https://a.espncdn.com/i/teamlogos/nfl/500/chi.png',
        },
        league: LeagueEnum.NFL,
        isUserCreated: false,
        isSaved: true,
      },
      {
        eventID: 'event-uuid-9',
        eventType: EventTypeEnum.Meetup,
        eventName: 'Raptors Fans Meetup',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'Toronto Sports Cafe, Toronto, ON',
        isUserCreated: true,
        isSaved: true,
      },
      {
        eventID: 'event-uuid-10',
        eventType: EventTypeEnum.Game,
        eventName: 'Maple Leafs vs. Canadiens',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'Scotiabank Arena, Toronto, ON',
        imageUrl: 'assets/events/leafs-canadiens.jpg',
        teamLogos: {
          home: 'https://a.espncdn.com/i/teamlogos/nhl/500/tor.png',
          away: 'https://a.espncdn.com/i/teamlogos/nhl/500/mtl.png',
        },
        league: LeagueEnum.NHL,
        isUserCreated: false,
        isSaved: true,
      },
    ];
    const myEvents: IEvent[] = [
      {
        eventID: 'event-uuid-3',
        eventType: EventTypeEnum.Meetup,
        eventName: 'Warriors Meetup',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'Chase Center, San Francisco, CA',
        isUserCreated: true,
        isSaved: true,
      },
      {
        eventID: 'event-uuid-5',
        eventType: EventTypeEnum.Tailgate,
        eventName: 'Giants Tailgate Party',
        dateTime: new Date('2024-10-15T19:00:00Z'),
        location: 'Chase Center, San Francisco, CA',
        isUserCreated: true,
        isSaved: true,
      },
    ];
    const myChats: IChatMessage[] = [
      {
        chatID: 'chat-uuid-1',
        teamID: '1',
        teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
        userID: 'user-uuid-2',
        userName: 'SportsFan99',
        messageContent: "Can't wait for the Lakers game this weekend!",
        timestamp: new Date('2024-10-10T12:00:00Z'),
      },
      {
        chatID: 'chat-uuid-2',
        teamID: '2',
        teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/bos.png',
        userID: 'user-uuid-2',
        userName: 'SportsFan99',
        messageContent: 'Anyone going to the Celtics game next week?',
        timestamp: new Date('2024-10-11T15:30:00Z'),
      },
      {
        chatID: 'chat-uuid-3',
        teamID: '3',
        teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png',
        userID: 'user-uuid-2',
        userName: 'SportsFan99',
        messageContent:
          'The Cowboys are looking strong this season! The Cowboys are looking strong this season! The Cowboys are looking strong this season! The Cowboys are looking strong this season! The Cowboys are looking strong this season! The Cowboys are looking strong this season! The Cowboys are looking strong this season!',
        timestamp: new Date('2024-10-12T09:45:00Z'),
      },
    ];

    const userProfile: IUserProfile = {
      headerInfo,
      accountSettings,
      savedEvents,
      myEvents,
      myChats,
    };

    //return this.http.get<IUserProfile>(`${this.apiUrl}/user/profile`).pipe(catchError(handleError));
    return of(userProfile).pipe(delay(1000));
  }

  submitVerificationApplications(form: IVerificationForm): Observable<null> {
    console.log('Submitting verification application:', form);
    // Nathan: Logic to submit verification application to backend API can be added here

    return this.http.post<null>(`${this.apiUrl}/user/verify`, form).pipe(catchError(handleError));
  }

  deleteUserAccount(): Observable<null> {
    console.log('Deleting user account...');
    // Nathan: Logic to delete user account via backend API can be added here

    return this.http.delete<null>(`${this.apiUrl}/user/account`).pipe(catchError(handleError));
  }

  updateUserPassword(newPassword: string): void {
    console.log('Updating user password...');
    // Nathan: Logic to update user password via clerk
  }

  updateFavoriteTeams(teamIDs: string[]): Observable<null> {
    console.log('Updating favorite teams:', teamIDs);
    // Nathan: Logic to update favorite teams via backend API can be added here

    return this.http
      .put<null>(`${this.apiUrl}/user/favorite-teams`, { teamIDs })
      .pipe(catchError(handleError));
  }

  updateAccountInfo(updatedInfo: IAccountSettings): Observable<null> {
    console.log('Updating account info:', updatedInfo);
    // Nathan: Logic to update account info via backend API can be added here

    return this.http
      .put<null>(`${this.apiUrl}/user/account-info`, updatedInfo)
      .pipe(catchError(handleError));
  }

  deleteSavedEvent(eventID: string): Observable<IEvent[]> {
    console.log('Deleting saved event:', eventID);
    // Nathan: Logic to delete saved event via backend API can be added here

    return this.http
      .delete<IEvent[]>(`${this.apiUrl}/user/saved-events/${eventID}`)
      .pipe(catchError(handleError));
  }
}
