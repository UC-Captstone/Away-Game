import { Component, ViewChild, ElementRef, signal, WritableSignal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { ISearchResults } from '../models/search-results';
import { SearchTypeEnum } from '../models/search-type-enum';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  standalone: true,
  imports: [CommonModule, DatePipe],
})
export class SearchBarComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  isLoading: WritableSignal<boolean> = signal(false);
  searchResults: WritableSignal<ISearchResults[]> = signal([]);
  showDropdown: WritableSignal<boolean> = signal(false);
  lastTerm: WritableSignal<string | null> = signal(null);
  SearchTypeEnum = SearchTypeEnum;

  constructor(
    private searchService: SearchService,
    private router: Router,
  ) {}

  onSearch(): void {
    const term = this.searchInput?.nativeElement.value?.trim();
    if (term) {
      this.isLoading.set(true);
      this.lastTerm.set(term);
      this.showDropdown.set(true);
      this.searchService.getSearchResults(term).subscribe({
        next: (results) => {
          console.log('Search results:', results);
          this.searchResults.set(results);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error fetching search results:', error);
          this.isLoading.set(false);
        },
      });
    } else {
      this.clearResults();
    }
  }

  onInputChanged(): void {
    const term = this.searchInput?.nativeElement.value || '';
    if (!term.trim()) {
      this.clearResults();
    } else {
      this.showDropdown.set(true); // Nathan: show while typing (could add debounce later)
    }
  }

  closeDropdown(): void {
    this.showDropdown.set(false);
  }

  onResultClick(result: ISearchResults): void {
    if (result.type === SearchTypeEnum.Game) {
      this.router.navigate(['/game-details'], {
        queryParams: {
          eventId: result.metadata?.eventId ?? '',
          gameId: result.id,
          gameName: result.title,
          saved: result.metadata?.saved ?? false,
          league: result.metadata?.league ?? '',
          location: result.metadata?.location ?? '',
          lat: result.metadata?.lat ?? '',
          lng: result.metadata?.lng ?? '',
          date: result.metadata?.date ?? '',
          homeLogo: result.teamLogos?.home ?? '',
          awayLogo: result.teamLogos?.away ?? '',
        },
      });
      this.closeDropdown();
      return;
    }

    if (result.type === SearchTypeEnum.Team) {
      const parsedTeamId = Number(result.id);
      if (!Number.isFinite(parsedTeamId) || parsedTeamId <= 0) {
        return;
      }

      this.router.navigate(['/events'], {
        queryParams: {
          mode: 'team',
          teamId: parsedTeamId,
          teamName: result.title,
          teamLogo: result.imageUrl ?? '',
          teamLeague: result.metadata?.league ?? '',
        },
      });
      this.closeDropdown();
      return;
    }

    if (result.type === SearchTypeEnum.City) {
      this.router.navigate(['/events'], {
        queryParams: {
          mode: 'city',
          city: result.title,
        },
      });
      this.closeDropdown();
    }
  }

  clearResults(): void {
    this.searchResults.set([]);
    this.showDropdown.set(false);
    this.isLoading.set(false);
    this.lastTerm.set(null);
  }
}
