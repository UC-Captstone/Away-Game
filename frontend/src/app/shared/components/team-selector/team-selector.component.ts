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
  Input,
  WritableSignal,
  signal,
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
  @Output() teamsSelected = new EventEmitter<ITeam[]>();
  @Input() multi: boolean = false;
  @Input() selectedTeams: ITeam[] = [];
  @Input() dropdownLimit = 4;
  @Input() fromVerification: boolean = false;

  @ViewChild('teamListbox') private teamListbox?: ElementRef<HTMLUListElement>;
  @ViewChild('searchInput') private searchInput?: ElementRef<HTMLInputElement>;

  readonly leagues = Object.values(LeagueEnum);
  private readonly destroy$ = new Subject<void>();
  private readonly league$ = new BehaviorSubject<LeagueEnum | null>(null);
  private readonly search$ = new BehaviorSubject<string>('');

  selectedLeague: WritableSignal<LeagueEnum | null> = signal(null);
  selectedTeamId: WritableSignal<string> = signal('');
  searchTerm: WritableSignal<string> = signal('');
  teams: WritableSignal<ITeam[]> = signal([]);
  loading: WritableSignal<boolean> = signal(false);
  noTeams: WritableSignal<boolean> = signal(false);
  activeIndex: WritableSignal<number> = signal(-1);
  isOpen: WritableSignal<boolean> = signal(false);

  get selectedTeam(): ITeam | undefined {
    return this.teams().find((t) => t.teamID === this.selectedTeamId());
  }

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
          this.loading.set(true);
          this.noTeams.set(false);
        }),
        switchMap(([league, term]) => {
          const leagueId = LeagueIdMap[league];
          return this.teamService
            .getTeamsByLeague(leagueId, term, this.dropdownLimit)
            .pipe(catchError(() => of([] as ITeam[])));
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((teams) => {
        this.teams.set(teams);
        this.loading.set(false);
        this.noTeams.set(teams.length === 0);
        this.activeIndex.set(teams.length ? 0 : -1);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLeagueChange(): void {
    this.selectedTeamId.set('');
    this.searchTerm.set('');
    this.activeIndex.set(-1);
    this.isOpen.set(false);
    this.league$.next(this.selectedLeague() ?? null);
    this.search$.next('');
  }

  toggleDropdown(): void {
    if (!this.selectedLeague()) return;
    this.isOpen.set(!this.isOpen());
    if (this.isOpen()) {
      queueMicrotask(() => this.searchInput?.nativeElement.focus());
      if (this.teams().length) this.activeIndex.set(Math.max(0, this.activeIndex()));
    }
  }

  onSearchChange(): void {
    this.search$.next(this.searchTerm().trim());
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeDropdown();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (this.teams().length) {
        this.activeIndex.set(this.activeIndex() < 0 ? 0 : this.activeIndex());
        this.teamListbox?.nativeElement.focus();
      }
    }
  }

  onSelectTeam(team: ITeam): void {
    if (this.multi) {
      this.toggleTeamSelection(team);
      return;
    }
    this.selectedTeamId.set(team.teamID);
    this.activeIndex.set(this.teams().findIndex((t) => t.teamID === team.teamID));
    this.teamSelected.emit(team);
    this.closeDropdown();
  }

  isTeamSelected(team: ITeam): boolean {
    return this.selectedTeams.some((t) => t.teamID === team.teamID);
  }

  toggleTeamSelection(team: ITeam): void {
    const exists = this.isTeamSelected(team);
    this.selectedTeams = exists
      ? this.selectedTeams.filter((t) => t.teamID !== team.teamID)
      : [...this.selectedTeams, team];
    this.teamsSelected.emit(this.selectedTeams);
  }

  onListKeydown(event: KeyboardEvent): void {
    if (!this.teams.length) return;

    const max = this.teams.length - 1;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.set(this.activeIndex() < 0 ? 0 : Math.min(this.activeIndex() + 1, max));
        this.scrollActiveIntoView();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.set(this.activeIndex() <= 0 ? 0 : this.activeIndex() - 1);
        this.scrollActiveIntoView();
        break;
      case 'Home':
        event.preventDefault();
        this.activeIndex.set(0);
        this.scrollActiveIntoView();
        break;
      case 'End':
        event.preventDefault();
        this.activeIndex.set(max);
        this.scrollActiveIntoView();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.activeIndex() >= 0) {
          const team = this.teams()[this.activeIndex()];
          this.multi ? this.toggleTeamSelection(team) : this.onSelectTeam(team);
        }
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

  private closeDropdown(): void {
    this.isOpen.set(false);
  }

  private scrollActiveIntoView(): void {
    const host = this.teamListbox?.nativeElement;
    if (!host || this.activeIndex() < 0) return;
    const el = host.querySelector<HTMLElement>(`#team-option-${this.activeIndex()}`);
    el?.scrollIntoView({ block: 'nearest' });
  }
}
