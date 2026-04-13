import { ILocation } from './location';
import { PlaceCategory } from './place-category';

export interface IPlace {
  fsqId: string;
  name: string;
  category: PlaceCategory;
  categoryLabel?: string;
  location: ILocation;
  address?: string;
  distanceMeters?: number;
}
