import { EventTypeEnum } from './event-type-enum';

export interface IEventCreateRequest {
  title: string;
  description?: string | null;
  eventType: EventTypeEnum;
  dateTime: string;
  gameId?: number;
  venueId?: number | null;
  latitude?: number | null;
  longitude?: number | null;
}
