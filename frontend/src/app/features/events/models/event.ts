import { EventTypeEnum } from '../../../shared/models/event-type-enum';
import { LeagueEnum } from '../../../shared/models/league-enum';

export interface IEvent {
  eventID: string; // UUID
  eventType: EventTypeEnum;
  eventName: string;
  dateTime: string; // ISO 8601 format
  location: string;
  imageUrl?: string; // optional URL to an image representing the event
  teamLogos?: {
    home?: string; // optional URL to home team logo
    away?: string; // optional URL to away team logo
  }; // optional array of team logo URLs associated with the event
  league?: LeagueEnum;
  isUserCreated?: boolean; // indicates if the event was created by the user
  isSaved: boolean; // indicates if the event is saved by the user
}
