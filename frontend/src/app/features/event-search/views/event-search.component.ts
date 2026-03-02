import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventFiltersPanelComponent } from '../components/event-filters-panel/event-filters-panel.component';
import { EventResultGridComponent } from '../components/event-result-grid/event-result-grid.component';
import { IEvent } from '../../../shared/models/event';
import { EventService } from '../../../shared/services/event.service';
import { DEFAULT_EVENT_FILTERS, IEventFilters } from '../models/event-search-filters';
import { ITeam } from '../../../shared/models/team';
import { LeagueEnum } from '../../../shared/models/league-enum';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  standalone: true,
  imports: [CommonModule, EventFiltersPanelComponent, EventResultGridComponent],
})
export class EventSearchComponent implements OnInit {
  isLoading: WritableSignal<boolean> = signal(false);
  readonly events: WritableSignal<IEvent[]> = signal([]);
  private activeFilters: IEventFilters = DEFAULT_EVENT_FILTERS;
  initialPanelFilters: IEventFilters = DEFAULT_EVENT_FILTERS;
  initialSportsFilterMode: 'league' | 'team' = 'league';
  initialSelectedTeams: ITeam[] = [];

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.hydrateFiltersFromRoute();
    this.loadEvents();
  }

  onApplyFilters(filters: IEventFilters): void {
    this.activeFilters = filters;
    this.loadEvents();
  }

  private loadEvents(): void {
    this.isLoading.set(true);
    this.eventService.searchEvents(this.activeFilters).subscribe({
      next: (events) => {
        this.events.set(events);
        this.isLoading.set(false);
      },
      error: (error) => {
        //Nathan: implement error handling UI in helper function
        console.error('Error loading events:', error);
        this.events.set([]);
        this.isLoading.set(false);
      },
    });
  }

  private hydrateFiltersFromRoute(): void {
    const queryMap = this.route.snapshot.queryParamMap;
    const mode = queryMap.get('mode');
    const city = queryMap.get('city')?.trim() ?? '';
    const teamIdParam = queryMap.get('teamId');
    const teamName = queryMap.get('teamName')?.trim() ?? '';
    const teamLogo = queryMap.get('teamLogo')?.trim() ?? '';
    const teamLeague = queryMap.get('teamLeague')?.trim() ?? '';

    const hydratedFilters: IEventFilters = {
      ...DEFAULT_EVENT_FILTERS,
      leagues: [],
      teamIds: [],
      eventTypes: [],
    };

    if (mode === 'city' && city) {
      hydratedFilters.locationQuery = city;
      this.initialSportsFilterMode = 'league';
    }

    if (mode === 'team' && teamIdParam) {
      const parsedTeamId = Number(teamIdParam);
      if (Number.isFinite(parsedTeamId) && parsedTeamId > 0) {
        hydratedFilters.teamIds = [parsedTeamId];
        this.initialSportsFilterMode = 'team';
        this.initialSelectedTeams = [
          this.buildInitialTeam(parsedTeamId, teamName, teamLogo, teamLeague),
        ];
      }
    }

    this.activeFilters = hydratedFilters;
    this.initialPanelFilters = { ...hydratedFilters };
  }

  private buildInitialTeam(
    teamId: number,
    displayName: string,
    logoUrl: string,
    leagueNameRaw: string,
  ): ITeam {
    const leagueName = this.parseLeagueEnum(leagueNameRaw) ?? Object.values(LeagueEnum)[0];

    return {
      teamId,
      league: {
        leagueID: 0,
        leagueName,
      },
      homeLocation: '',
      teamName: displayName || `Team ${teamId}`,
      displayName: displayName || `Team ${teamId}`,
      logoUrl,
    };
  }

  private parseLeagueEnum(value: string): LeagueEnum | null {
    if (!value) {
      return null;
    }

    const match = (Object.values(LeagueEnum) as string[]).find(
      (leagueName) => leagueName.toLowerCase() === value.toLowerCase(),
    );

    return (match as LeagueEnum | undefined) ?? null;
  }
}
