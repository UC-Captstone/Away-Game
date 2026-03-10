import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeagueEnum } from '../../../../../shared/models/league-enum';

@Component({
  selector: 'app-league-selection-filter',
  templateUrl: './league-selection-filter.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LeagueSelectionFilterComponent {
  @Input() selectedLeagues: LeagueEnum[] = [];

  @Output() selectedLeaguesChange = new EventEmitter<LeagueEnum[]>();

  showMoreLeagues = false;
  readonly leagues = Object.values(LeagueEnum);
  readonly maxVisibleLeagues = 4;

  get allLeaguesSelected(): boolean {
    return this.selectedLeagues.length === 0;
  }

  get visibleLeagues(): LeagueEnum[] {
    return this.leagues.slice(0, this.maxVisibleLeagues);
  }

  get overflowLeagues(): LeagueEnum[] {
    return this.leagues.slice(this.maxVisibleLeagues);
  }

  onAllLeaguesClick(event: Event): void {
    event.preventDefault();
    this.selectedLeagues = [];
    this.selectedLeaguesChange.emit(this.selectedLeagues);
  }

  onLeagueClick(league: LeagueEnum, event: Event): void {
    event.preventDefault();

    if (this.selectedLeagues.includes(league)) {
      this.selectedLeagues = this.selectedLeagues.filter((item) => item !== league);
      this.selectedLeaguesChange.emit(this.selectedLeagues);
      return;
    }

    this.selectedLeagues = [...this.selectedLeagues, league];

    if (this.selectedLeagues.length === this.leagues.length) {
      this.selectedLeagues = [];
    }

    this.selectedLeaguesChange.emit(this.selectedLeagues);
  }

  onToggleMoreLeagues(event: Event): void {
    event.preventDefault();
    this.showMoreLeagues = !this.showMoreLeagues;
  }

  isLeagueSelected(league: LeagueEnum): boolean {
    return !this.allLeaguesSelected && this.selectedLeagues.includes(league);
  }
}
