import { EventTypeEnum } from './event-type-enum';
import { LeagueEnum } from './league-enum';
import { ILocation } from './location';

export interface IEvent {
  eventId: string; // UUID
  eventType: EventTypeEnum;
  eventName: string;
  dateTime: Date;
  location: ILocation;
  venueName: string;
  imageUrl?: string; // optional URL to an image representing the event
  teamLogos?: {
    home?: string; // optional URL to home team logo
    away?: string; // optional URL to away team logo
  }; // optional array of team logo URLs associated with the event
  league?: LeagueEnum;
  isUserCreated?: boolean; // indicates if the event was created by the user
  isSaved: boolean; // indicates if the event is saved by the user
}
