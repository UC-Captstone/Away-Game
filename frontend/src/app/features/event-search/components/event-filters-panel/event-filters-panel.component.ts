import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateRangeFilterComponent } from '../event-filters/date-range-filter/date-range-filter.component';
import { EventSearchFilterComponent } from '../event-filters/event-search-filter/event-search-filter.component';
import { EventTypeFilterComponent } from '../event-filters/event-type-filter/event-type-filter.component';
import { LeagueSelectionFilterComponent } from '../event-filters/league-selection-filter/league-selection-filter.component';
import { LeagueEnum } from '../../../../shared/models/league-enum';
import { EventTypeEnum } from '../../../../shared/models/event-type-enum';
import { DEFAULT_EVENT_FILTERS, IEventFilters } from '../../models/event-search-filters';
import { LocationFilterComponent } from '../event-filters/location-filter/location-filter.component';
import { SavedOnlyFilterComponent } from '../event-filters/saved-only-filter/saved-only-filter.component';
import { TeamSelectorComponent } from '../../../../shared/components/team-selector/team-selector.component';
import { ITeam } from '../../../../shared/models/team';

@Component({
  selector: 'app-event-filters-panel',
  templateUrl: './event-filters-panel.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EventSearchFilterComponent,
    LeagueSelectionFilterComponent,
    DateRangeFilterComponent,
    LocationFilterComponent,
    SavedOnlyFilterComponent,
    EventTypeFilterComponent,
    TeamSelectorComponent,
  ],
})
export class EventFiltersPanelComponent {
  @Output() applyFilters = new EventEmitter<IEventFilters>();
  @Input() set initialFilters(value: IEventFilters | null) {
    if (!value) {
      return;
    }

    this.keyword = value.keyword;
    this.locationQuery = value.locationQuery;
    this.startDate = value.startDate;
    this.endDate = value.endDate;
    this.savedOnly = value.savedOnly;
    this.selectedLeagues = [...value.leagues];
    this.selectedEventTypes = [...value.eventTypes];
    this.lastAppliedFilterState = this.getCurrentFilterState();
  }

  @Input() set initialSportsFilterMode(value: 'league' | 'team' | null) {
    if (!value) {
      return;
    }

    this.sportsFilterMode = value;
    this.lastAppliedFilterState = this.getCurrentFilterState();
  }

  @Input() set initialSelectedTeams(value: ITeam[] | null) {
    if (!value) {
      return;
    }

    this.selectedTeams = [...value];
    this.lastAppliedFilterState = this.getCurrentFilterState();
  }

  private lastAppliedFilterState = '';

  keyword = DEFAULT_EVENT_FILTERS.keyword;
  locationQuery = DEFAULT_EVENT_FILTERS.locationQuery;
  startDate = DEFAULT_EVENT_FILTERS.startDate;
  endDate = DEFAULT_EVENT_FILTERS.endDate;
  savedOnly = DEFAULT_EVENT_FILTERS.savedOnly;
  sportsFilterMode: 'league' | 'team' = 'league';
  selectedLeagues: LeagueEnum[] = [];
  selectedTeams: ITeam[] = [];
  selectedEventTypes: EventTypeEnum[] = [];

  constructor() {
    this.lastAppliedFilterState = this.getCurrentFilterState();
  }

  hasFilterChanges(): boolean {
    return this.getCurrentFilterState() !== this.lastAppliedFilterState;
  }

  onSportsFilterModeChange(mode: 'league' | 'team'): void {
    if (this.sportsFilterMode === mode) {
      return;
    }

    this.sportsFilterMode = mode;

    if (mode === 'league') {
      this.selectedTeams = [];
      return;
    }

    this.selectedLeagues = [];
  }

  onTeamsSelected(teams: ITeam[]): void {
    this.selectedTeams = teams;
  }

  onApplyFilters(): void {
    const filters: IEventFilters = {
      keyword: this.keyword.trim(),
      leagues: this.sportsFilterMode === 'league' ? this.selectedLeagues : [],
      teamIds:
        this.sportsFilterMode === 'team' ? this.selectedTeams.map((team) => team.teamId) : [],
      startDate: this.startDate,
      endDate: this.endDate,
      locationQuery: this.locationQuery.trim(),
      savedOnly: this.savedOnly,
      eventTypes: this.selectedEventTypes,
    };

    this.applyFilters.emit(filters);
    this.lastAppliedFilterState = this.getCurrentFilterState();
  }

  private getCurrentFilterState(): string {
    const normalizedLeagues = [...this.selectedLeagues].sort();
    const normalizedTeamIds = [...this.selectedTeams].map((team) => team.teamId).sort();
    const normalizedEventTypes = [...this.selectedEventTypes].sort();

    return JSON.stringify({
      keyword: this.keyword.trim(),
      sportsFilterMode: this.sportsFilterMode,
      leagues: this.sportsFilterMode === 'league' ? normalizedLeagues : [],
      teamIds: this.sportsFilterMode === 'team' ? normalizedTeamIds : [],
      startDate: this.startDate,
      endDate: this.endDate,
      locationQuery: this.locationQuery.trim(),
      savedOnly: this.savedOnly,
      eventTypes: normalizedEventTypes,
    });
  }
}
