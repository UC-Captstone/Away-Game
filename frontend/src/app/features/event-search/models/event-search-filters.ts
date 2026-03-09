import { LeagueEnum } from '../../../shared/models/league-enum';
import { EventTypeEnum } from '../../../shared/models/event-type-enum';

export interface IEventFilters {
  keyword: string;
  leagues: LeagueEnum[];
  teamIds: number[];
  startDate: string;
  endDate: string;
  locationQuery: string;
  savedOnly: boolean;
  eventTypes: EventTypeEnum[];
}

export const DEFAULT_EVENT_FILTERS: IEventFilters = {
  keyword: '',
  leagues: [],
  teamIds: [],
  startDate: '',
  endDate: '',
  locationQuery: '',
  savedOnly: false,
  eventTypes: [],
};
