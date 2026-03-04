import { SearchTypeEnum } from './search-type-enum';

export interface ISearchResultMetadata {
  league?: string;
  location?: string;
  date?: string;
  description?: string;
  country?: string;
  lat?: number;
  lng?: number;
}

export interface ISearchResults {
  id: string; // teamID, gameID, eventID, etc.
  type: SearchTypeEnum;
  title: string; // Name of the team, game, event, etc.
  imageUrl?: string; // Optional image URL for the result
  teamLogos?: {
    home?: string;
    away?: string;
  };
  metadata?: ISearchResultMetadata; // Additional metadata relevant to the search result
}
