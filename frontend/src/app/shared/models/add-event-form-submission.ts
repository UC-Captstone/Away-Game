import { EventTypeEnum } from './event-type-enum';

export interface IAddEventFormSubmission {
  title: string;
  description: string | null;
  eventType: EventTypeEnum;
  dateTime: string;
  gameId: number;
  latitude: number;
  longitude: number;
}
