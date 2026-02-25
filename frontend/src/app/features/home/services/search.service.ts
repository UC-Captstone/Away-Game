import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ISearchResults } from '../models/search-results';
import { SearchTypeEnum } from '../models/search-type-enum';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = environment.apiUrl + '/search';

  constructor(private http: HttpClient) {}

  getSearchResults(searchTerm: string): Observable<ISearchResults[]> {
    return this.http.get<ISearchResults[]>(this.apiUrl, {
      params: { query: searchTerm },
    });
  }
}
