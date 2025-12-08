import { Component, ViewChild, ElementRef, signal, WritableSignal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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

  constructor(private searchService: SearchService) {}

  onSearch(): void {
    const term = this.searchInput?.nativeElement.value?.trim();
    if (term) {
      this.isLoading.set(true);
      this.lastTerm.set(term);
      this.showDropdown.set(true);
      this.searchService.getSeachResults(term).subscribe({
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

  clearResults(): void {
    this.searchResults.set([]);
    this.showDropdown.set(false);
    this.isLoading.set(false);
    this.lastTerm.set(null);
  }

  trackById(index: number, item: ISearchResults): string {
    return item.id;
  }
}
