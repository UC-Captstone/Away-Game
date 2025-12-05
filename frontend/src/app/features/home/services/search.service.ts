import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ISearchResults } from '../models/search-results';
import { SearchTypeEnum } from '../models/search-type-enum';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  //Nathan: wait for merge
  //private apiUrl = environment.apiUrl + '/search' ;
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getSeachResults(searchTerm: string): Observable<ISearchResults[]> {
    const searchResults: ISearchResults[] = [
      {
        id: '1',
        type: SearchTypeEnum.Team,
        title: 'Sample Team',
        imageUrl: 'https://a.espncdn.com/i/teamlogos/nba/500/mia.png',
        metadata: { league: 'Sample League' },
      },
      {
        id: '2',
        type: SearchTypeEnum.Game,
        title: 'Sample Game',
        teamLogos: {
          homeLogo: 'https://a.espncdn.com/i/teamlogos/nba/500/lal.png',
          awayLogo: 'https://a.espncdn.com/i/teamlogos/nba/500/gs.png',
        },
        metadata: { date: '2024-01-01', location: 'Sample Stadium' },
      },
      {
        id: '3',
        type: SearchTypeEnum.Event,
        title: 'Sample Event',
        imageUrl: '/assets/tailgate.png',
        metadata: { description: 'This is a sample event.' },
      },
      {
        id: '4',
        type: SearchTypeEnum.City,
        title: 'Sample City',
        metadata: { country: 'Sample country' },
      },
    ];
    // Nathan: Placeholder for actual HTTP request
    return of(searchResults).pipe(delay(1000));
  }
}
