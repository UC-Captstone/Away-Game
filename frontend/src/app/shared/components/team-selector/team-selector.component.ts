import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeagueEnum, LeagueIdMap } from '../../models/league-enum';
import { ITeam } from '../../models/team';
import { TeamService } from '../../services/team.service';
import { BehaviorSubject, Subject, combineLatest, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-team-selector',
  templateUrl: './team-selector.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TeamSelectorComponent implements OnInit, OnDestroy {
  @Output() teamSelected = new EventEmitter<ITeam>();
  @ViewChild('teamListbox') private teamListbox?: ElementRef<HTMLUListElement>;
  @ViewChild('searchInput') private searchInput?: ElementRef<HTMLInputElement>;

  readonly leagues = Object.values(LeagueEnum);
  private readonly destroy$ = new Subject<void>();
  private readonly league$ = new BehaviorSubject<LeagueEnum | null>(null);
  private readonly search$ = new BehaviorSubject<string>('');

  get selectedTeam(): ITeam | undefined {
    return this.teams.find((t) => t.teamID === this.selectedTeamId);
  }

  selectedLeague?: LeagueEnum;
  selectedTeamId = '';
  searchTerm = '';
  teams: ITeam[] = [];
  loading = false;
  noTeams = false;
  activeIndex = -1;
  isOpen = false;

  constructor(
    private readonly teamService: TeamService,
    private readonly elRef: ElementRef,
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.league$.pipe(filter((l): l is LeagueEnum => !!l)),
      this.search$.pipe(debounceTime(150), distinctUntilChanged()),
    ])
      .pipe(
        tap(() => {
          this.loading = true;
          this.noTeams = false;
        }),
        switchMap(([league, term]) => {
          const leagueId = LeagueIdMap[league];
          return this.teamService
            .getTeamsByLeague(leagueId, term)
            .pipe(catchError(() => of([] as ITeam[])));
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((teams) => {
        this.teams = teams;
        this.loading = false;
        this.noTeams = teams.length === 0;
        this.activeIndex = teams.length ? 0 : -1;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLeagueChange(): void {
    this.selectedTeamId = '';
    this.searchTerm = '';
    this.activeIndex = -1;
    this.isOpen = false;
    this.league$.next(this.selectedLeague ?? null);
    this.search$.next('');
  }

  onSearchChange(): void {
    this.search$.next(this.searchTerm.trim());
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeDropdown();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.teams.length) {
        this.activeIndex = this.activeIndex < 0 ? 0 : this.activeIndex;
        this.teamListbox?.nativeElement.focus();
      }
    }
  }

  toggleDropdown(): void {
    if (!this.selectedLeague) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      queueMicrotask(() => this.searchInput?.nativeElement.focus());
      if (this.teams.length) this.activeIndex = Math.max(0, this.activeIndex);
    }
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  onSelectTeam(team: ITeam): void {
    this.selectedTeamId = team.teamID;
    this.activeIndex = this.teams.findIndex((t) => t.teamID === team.teamID);
    this.teamSelected.emit(team);
    this.closeDropdown();
  }

  onListKeydown(event: KeyboardEvent): void {
    if (!this.teams.length) return;

    const max = this.teams.length - 1;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex = this.activeIndex < 0 ? 0 : Math.min(this.activeIndex + 1, max);
        this.scrollActiveIntoView();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex = this.activeIndex <= 0 ? 0 : this.activeIndex - 1;
        this.scrollActiveIntoView();
        break;
      case 'Home':
        event.preventDefault();
        this.activeIndex = 0;
        this.scrollActiveIntoView();
        break;
      case 'End':
        event.preventDefault();
        this.activeIndex = max;
        this.scrollActiveIntoView();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.activeIndex >= 0) this.onSelectTeam(this.teams[this.activeIndex]);
        break;
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    if (!this.elRef.nativeElement.contains(target)) this.closeDropdown();
  }

  private scrollActiveIntoView(): void {
    const host = this.teamListbox?.nativeElement;
    if (!host || this.activeIndex < 0) return;
    const el = host.querySelector<HTMLElement>(`#team-option-${this.activeIndex}`);
    el?.scrollIntoView({ block: 'nearest' });
  }
}
