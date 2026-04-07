import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EventDetailsEditDraft } from '../../../shared/models/event-details-edit-draft';
import { EventDetailsPanelComponent } from '../components/event-details-panel/event-details-panel.component';
import { EventDetailsMapPanelComponent } from '../components/event-details-map-panel/event-details-map-panel.component';
import { IEvent } from '../../../shared/models/event';
import { EventTypeEnum } from '../../../shared/models/event-type-enum';
import { ILinkedGameSummary } from '../../../shared/models/linked-game-summary';
import { ILinkedGameTeam } from '../../../shared/models/linked-game-team';
import { ILocation } from '../../../shared/models/location';
import { IMapMarker } from '../../../shared/models/map-marker';
import { ISafetyAlert } from '../../../shared/models/safety-alert';
import { SafetyAlertService } from '../../../shared/services/safety-alert.service';
import { SavedEventsService } from '../../../shared/services/saved-events.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  standalone: true,
  imports: [CommonModule, EventDetailsPanelComponent, EventDetailsMapPanelComponent],
})
export class EventDetailsComponent implements OnInit {
  private readonly defaultCenter: ILocation = { lat: 39.8283, lng: -98.5795 };
  private readonly nearbyRadiusMiles = 15;
  private readonly eventMarkerIcon: L.Icon = this.createCircleMarkerIcon('#22c55e');
  private readonly nearbyMarkerIcon: L.Icon = this.createCircleMarkerIcon('#f59e0b');
  private readonly safetyMarkerIcon: L.Icon = this.createCircleMarkerIcon('#ef4444');

  isLoading: WritableSignal<boolean> = signal(false);
  event: WritableSignal<IEvent | null> = signal(null);
  linkedGame: WritableSignal<ILinkedGameSummary | null> = signal(null);
  safetyAlerts: WritableSignal<ISafetyAlert[]> = signal([]);
  nearbyEvents: WritableSignal<IEvent[]> = signal([]);
  mapMarkers: WritableSignal<IMapMarker[]> = signal([]);

  showEventOverlay: WritableSignal<boolean> = signal(true);
  showNearbyOverlay: WritableSignal<boolean> = signal(true);
  showSafetyOverlay: WritableSignal<boolean> = signal(true);

  isEditing: WritableSignal<boolean> = signal(false);
  editDraft: WritableSignal<EventDetailsEditDraft> = signal(this.buildInitialDraft(null));
  localEditNotice: WritableSignal<string | null> = signal(null);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly safetyAlertService: SafetyAlertService,
    private readonly savedEventsService: SavedEventsService,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.isLoading.set(true);
      this.localEditNotice.set(null);

      const fallbackEvent = this.buildEventFromQuery(params);
      const eventIdFromQuery = params.get('eventId') ?? params.get('id') ?? fallbackEvent.eventId;

      this.resolveEvent(eventIdFromQuery, fallbackEvent)
        .pipe(
          switchMap((resolvedEvent) => {
            const normalizedEvent = this.normalizeEvent(resolvedEvent, fallbackEvent);
            this.event.set(normalizedEvent);
            this.editDraft.set(this.buildInitialDraft(normalizedEvent));

            return forkJoin({
              game: this.loadLinkedGame(normalizedEvent.gameId),
              alerts: this.loadSafetyAlerts(normalizedEvent),
              nearby: this.loadNearbyEvents(normalizedEvent),
            }).pipe(
              map((overlayData) => ({
                event: normalizedEvent,
                game: overlayData.game,
                alerts: overlayData.alerts,
                nearby: overlayData.nearby,
              })),
            );
          }),
          catchError(() => {
            this.event.set(this.normalizeEvent(fallbackEvent, fallbackEvent));
            this.linkedGame.set(null);
            this.safetyAlerts.set([]);
            this.nearbyEvents.set([]);
            this.refreshMarkers();
            return of(null);
          }),
        )
        .subscribe((result) => {
          if (result) {
            this.linkedGame.set(result.game);
            this.safetyAlerts.set(result.alerts);
            this.nearbyEvents.set(result.nearby);
          }
          this.refreshMarkers();
          this.isLoading.set(false);
        });
    });
  }

  get eventCenter(): ILocation {
    return this.event()?.location ?? this.defaultCenter;
  }

  get isOwnEvent(): boolean {
    return this.event()?.isUserCreated === true;
  }

  get relatedHomeName(): string {
    const game = this.linkedGame();
    return game?.homeTeam?.displayName || game?.homeTeam?.teamName || 'Home Team';
  }

  get relatedAwayName(): string {
    const game = this.linkedGame();
    return game?.awayTeam?.displayName || game?.awayTeam?.teamName || 'Away Team';
  }

  get relatedHomeLogo(): string | undefined {
    return this.linkedGame()?.homeTeam?.logoUrl;
  }

  get relatedAwayLogo(): string | undefined {
    return this.linkedGame()?.awayTeam?.logoUrl;
  }

  onToggleEventOverlay(): void {
    this.showEventOverlay.set(!this.showEventOverlay());
    this.refreshMarkers();
  }

  onToggleNearbyOverlay(): void {
    this.showNearbyOverlay.set(!this.showNearbyOverlay());
    this.refreshMarkers();
  }

  onToggleSafetyOverlay(): void {
    this.showSafetyOverlay.set(!this.showSafetyOverlay());
    this.refreshMarkers();
  }

  onSavedToggle(): void {
    const currentEvent = this.event();
    if (!currentEvent?.eventId) {
      return;
    }

    const previousSavedState = currentEvent.isSaved;
    const next = { ...currentEvent, isSaved: !previousSavedState };
    this.event.set(next);

    const request$ = next.isSaved
      ? this.savedEventsService.addSavedEvent(next.eventId)
      : this.savedEventsService.deleteSavedEvent(next.eventId);

    request$.subscribe({
      next: (savedEvents) => {
        const isSaved = savedEvents.some((item) => item.eventId === next.eventId);
        this.event.set({ ...next, isSaved });
      },
      error: () => {
        this.event.set({ ...next, isSaved: previousSavedState });
      },
    });
  }

  startEditing(): void {
    const currentEvent = this.event();
    if (!currentEvent || !this.isOwnEvent) {
      return;
    }

    this.editDraft.set(this.buildInitialDraft(currentEvent));
    this.localEditNotice.set(null);
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    this.isEditing.set(false);
    this.localEditNotice.set(null);
  }

  onEventNameChange(value: string): void {
    const draft = this.editDraft();
    this.editDraft.set({
      ...draft,
      eventName: value,
    });
  }

  onVenueNameChange(value: string): void {
    const draft = this.editDraft();
    this.editDraft.set({
      ...draft,
      venueName: value,
    });
  }

  onDateTimeChange(value: string): void {
    const draft = this.editDraft();
    this.editDraft.set({
      ...draft,
      dateTime: value,
    });
  }

  navigateToLinkedGame(): void {
    const currentEvent = this.event();
    if (!currentEvent?.gameId) {
      return;
    }

    const linkedGame = this.linkedGame();
    const matchupName = `${this.relatedAwayName} @ ${this.relatedHomeName}`;
    const gameDateTime = linkedGame?.dateTime ?? this.parseDateValue(currentEvent.dateTime)?.toISOString();
    const venueName = linkedGame?.venueName ?? currentEvent.venueName;
    const league = linkedGame?.leagueName ?? (currentEvent.league ?? '');
    const lat = linkedGame?.lat ?? currentEvent.location?.lat;
    const lng = linkedGame?.lng ?? currentEvent.location?.lng;

    this.router.navigate(['/game-details'], {
      queryParams: {
        eventId: currentEvent.eventId,
        gameId: currentEvent.gameId,
        gameName: matchupName,
        venueName,
        location: venueName,
        dateTime: gameDateTime,
        date: gameDateTime,
        lat,
        lng,
        homeLogo: this.relatedHomeLogo ?? '',
        awayLogo: this.relatedAwayLogo ?? '',
        league,
        saved: currentEvent.isSaved,
      },
    });
  }

  saveEdits(): void {
    const currentEvent = this.event();
    if (!currentEvent || !this.isOwnEvent) {
      return;
    }

    const draft = this.editDraft();
    const parsedDate = new Date(draft.dateTime);
    const nextDate = Number.isNaN(parsedDate.getTime()) ? currentEvent.dateTime : parsedDate;

    const updatedEvent: IEvent = {
      ...currentEvent,
      eventName: draft.eventName.trim() || currentEvent.eventName,
      venueName: draft.venueName.trim() || currentEvent.venueName,
      dateTime: nextDate,
    };

    this.event.set(updatedEvent);
    this.isEditing.set(false);
    this.localEditNotice.set('Edits applied locally. Event update API is not available yet.');
    this.refreshMarkers();
  }

  private resolveEvent(eventId: string, fallbackEvent: IEvent): Observable<IEvent> {
    if (!eventId) {
      return of(fallbackEvent);
    }

    return this.http
      .get<IEvent>(`${environment.apiUrl}/events/by-event-id/${eventId}`)
      .pipe(catchError(() => of(fallbackEvent)));
  }

  private loadSafetyAlerts(event: IEvent): Observable<ISafetyAlert[]> {
    if (event.gameId) {
      return this.safetyAlertService.listAlerts(event.gameId, undefined, true, 200, 0).pipe(
        catchError(() => of([])),
      );
    }

    return this.safetyAlertService.listAlerts(undefined, undefined, true, 200, 0).pipe(
      map((alerts) =>
        alerts.filter((alert) => {
          if (alert.latitude == null || alert.longitude == null) {
            return false;
          }
          return (
            this.distanceMiles(event.location, { lat: alert.latitude, lng: alert.longitude }) <=
            this.nearbyRadiusMiles
          );
        }),
      ),
      catchError(() => of([])),
    );
  }

  private loadLinkedGame(gameId?: number): Observable<ILinkedGameSummary | null> {
    if (!gameId) {
      return of(null);
    }

    return this.http
      .get<unknown>(`${environment.apiUrl}/games/${gameId}`)
      .pipe(
        map((raw) => this.normalizeLinkedGame(raw, gameId)),
        catchError(() => of(null)),
      );
  }

  private normalizeLinkedGame(raw: unknown, fallbackGameId: number): ILinkedGameSummary | null {
    if (!raw || typeof raw !== 'object') {
      return null;
    }

    const value = raw as Record<string, unknown>;
    const homeRaw = (value['homeTeam'] ?? value['home_team']) as Record<string, unknown> | undefined;
    const awayRaw = (value['awayTeam'] ?? value['away_team']) as Record<string, unknown> | undefined;
    const leagueRaw = (value['league'] as Record<string, unknown> | undefined) ?? undefined;
    const venueRaw = (value['venue'] as Record<string, unknown> | undefined) ?? undefined;

    return {
      gameId: this.toNumber(value['gameId'] ?? value['game_id']) ?? fallbackGameId,
      homeTeam: this.normalizeLinkedGameTeam(homeRaw),
      awayTeam: this.normalizeLinkedGameTeam(awayRaw),
      leagueName: this.toStringValue(leagueRaw?.['leagueName'] ?? leagueRaw?.['league_name']),
      venueName: this.toStringValue(venueRaw?.['name']),
      dateTime: this.toStringValue(value['dateTime'] ?? value['date_time']),
      lat: this.toNumber(venueRaw?.['latitude']),
      lng: this.toNumber(venueRaw?.['longitude']),
    };
  }

  private normalizeLinkedGameTeam(team: Record<string, unknown> | undefined): ILinkedGameTeam | undefined {
    if (!team) {
      return undefined;
    }

    return {
      displayName: this.toStringValue(team['displayName'] ?? team['display_name']),
      teamName: this.toStringValue(team['teamName'] ?? team['team_name']),
      logoUrl: this.toStringValue(team['logoUrl'] ?? team['logo_url']),
    };
  }

  private toStringValue(value: unknown): string | undefined {
    return typeof value === 'string' && value.trim() ? value : undefined;
  }

  private toNumber(value: unknown): number | undefined {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }

    return undefined;
  }

  private loadNearbyEvents(event: IEvent): Observable<IEvent[]> {
    const params = new HttpParams()
      .set('lat', event.location.lat.toString())
      .set('lng', event.location.lng.toString())
      .set('radius', this.nearbyRadiusMiles.toString())
      .set('limit', '40');

    return this.http.get<IEvent[]>(`${environment.apiUrl}/events/nearby`, { params }).pipe(
      map((events) => events.filter((item) => item.eventId !== event.eventId)),
      catchError(() => of([])),
    );
  }

  private refreshMarkers(): void {
    const currentEvent = this.event();
    if (!currentEvent) {
      this.mapMarkers.set([]);
      return;
    }

    const markers: IMapMarker[] = [];

    if (this.showEventOverlay()) {
      markers.push({
        lat: currentEvent.location.lat,
        lng: currentEvent.location.lng,
        popup: `<b>${currentEvent.eventName}</b><br><small>${currentEvent.eventType}</small>`,
        icon: this.eventMarkerIcon,
        navigation: this.buildNavigationForEvent(currentEvent),
      });
    }

    if (this.showNearbyOverlay()) {
      this.nearbyEvents().forEach((nearbyEvent) => {
        markers.push({
          lat: nearbyEvent.location.lat,
          lng: nearbyEvent.location.lng,
          popup: `<b>${nearbyEvent.eventName}</b><br><small>${nearbyEvent.eventType}</small>`,
          icon: this.nearbyMarkerIcon,
          navigation: this.buildNavigationForEvent(nearbyEvent),
        });
      });
    }

    if (this.showSafetyOverlay()) {
      this.safetyAlerts().forEach((alert) => {
        if (alert.latitude == null || alert.longitude == null) {
          return;
        }

        markers.push({
          lat: alert.latitude,
          lng: alert.longitude,
          popup: `<b>Safety: ${alert.title}</b><br><small>${alert.severity}</small>`,
          icon: this.safetyMarkerIcon,
        });
      });
    }

    this.mapMarkers.set(markers);
  }

  private normalizeEvent(event: IEvent, fallbackEvent: IEvent): IEvent {
    const fallbackDate = this.parseDateValue(fallbackEvent.dateTime) ?? new Date();
    const eventDate = this.parseDateValue(event.dateTime) ?? fallbackDate;

    return {
      ...fallbackEvent,
      ...event,
      dateTime: eventDate,
      location: event.location ?? fallbackEvent.location ?? this.defaultCenter,
      eventType: event.eventType ?? fallbackEvent.eventType,
      isSaved: event.isSaved ?? fallbackEvent.isSaved,
      isUserCreated: event.isUserCreated ?? fallbackEvent.isUserCreated ?? false,
    };
  }

  private parseDateValue(dateValue: Date | string | null | undefined): Date | null {
    if (!dateValue) {
      return null;
    }

    if (dateValue instanceof Date) {
      return Number.isNaN(dateValue.getTime()) ? null : dateValue;
    }

    const parsed = new Date(dateValue);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private buildEventFromQuery(params: { get(name: string): string | null }): IEvent {
    const eventId = params.get('eventId') ?? params.get('id') ?? '';
    const eventTypeRaw = (params.get('eventType') ?? EventTypeEnum.Other).toLowerCase();

    const lat = this.parseCoordinateParam(params.get('lat'));
    const lng = this.parseCoordinateParam(params.get('lng'));
    const location =
      lat !== undefined && lng !== undefined
        ? { lat, lng }
        : { ...this.defaultCenter };

    const dateParam = params.get('dateTime') ?? params.get('date');
    const parsedDate = dateParam ? new Date(dateParam) : null;
    const dateTime = parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : new Date();

    const eventType = this.mapEventType(eventTypeRaw);

    return {
      eventId,
      eventType,
      eventName: params.get('eventName') ?? params.get('title') ?? 'Event Details',
      description: params.get('description') ?? undefined,
      dateTime,
      location,
      venueName: params.get('venueName') ?? params.get('location') ?? 'Location TBD',
      imageUrl: params.get('imageUrl') ?? undefined,
      league: params.get('league') ?? undefined,
      isUserCreated: params.get('isUserCreated') === 'true',
      isSaved: params.get('saved') === 'true',
    };
  }

  private parseCoordinateParam(rawValue: string | null): number | undefined {
    if (rawValue == null) {
      return undefined;
    }

    const trimmedValue = rawValue.trim();
    if (!trimmedValue) {
      return undefined;
    }

    const parsedValue = Number(trimmedValue);
    return Number.isFinite(parsedValue) ? parsedValue : undefined;
  }

  private mapEventType(value: string): EventTypeEnum {
    switch (value) {
      case 'game':
        return EventTypeEnum.Game;
      case 'tailgate':
        return EventTypeEnum.Tailgate;
      case 'postgame':
        return EventTypeEnum.Postgame;
      case 'watch':
        return EventTypeEnum.Watch;
      default:
        return EventTypeEnum.Other;
    }
  }

  private buildNavigationForEvent(event: IEvent): IMapMarker['navigation'] {
    const isGame = (event.eventType ?? '').trim().toLowerCase() === EventTypeEnum.Game.toLowerCase();

    if (isGame) {
      return {
        path: '/game-details',
        queryParams: {
          eventId: event.eventId,
          gameId: event.gameId,
          gameName: event.eventName,
          venueName: event.venueName,
          dateTime: event.dateTime?.toString(),
          lat: event.location?.lat,
          lng: event.location?.lng,
          homeLogo: event.teamLogos?.home ?? '',
          awayLogo: event.teamLogos?.away ?? '',
          league: event.league ?? '',
          saved: event.isSaved,
        },
      };
    }

    return {
      path: '/event-details',
      queryParams: {
        eventId: event.eventId,
        eventName: event.eventName,
        description: event.description ?? '',
        eventType: event.eventType,
        venueName: event.venueName,
        location: event.venueName,
        dateTime: event.dateTime?.toString(),
        lat: event.location?.lat,
        lng: event.location?.lng,
        imageUrl: event.imageUrl ?? '',
        league: event.league ?? '',
        isUserCreated: event.isUserCreated ?? false,
        saved: event.isSaved,
      },
    };
  }

  private buildInitialDraft(event: IEvent | null): EventDetailsEditDraft {
    const sourceEvent = event ?? {
      eventName: '',
      venueName: '',
      dateTime: new Date(),
      location: this.defaultCenter,
    };

    return {
      eventName: sourceEvent.eventName,
      venueName: sourceEvent.venueName,
      dateTime: this.toDatetimeLocalValue(sourceEvent.dateTime),
    };
  }

  private toDatetimeLocalValue(dateValue: Date | string): string {
    const date = this.parseDateValue(dateValue) ?? new Date();
    const offsetMs = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
  }

  private createCircleMarkerIcon(colorHex: string): L.Icon {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="11" fill="${colorHex}" stroke="#e2e8f0" stroke-width="3" />
      </svg>
    `;

    return L.icon({
      iconUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });
  }

  private distanceMiles(from: ILocation, to: ILocation): number {
    const earthRadiusMiles = 3958.8;
    const dLat = this.toRadians(to.lat - from.lat);
    const dLng = this.toRadians(to.lng - from.lng);
    const lat1 = this.toRadians(from.lat);
    const lat2 = this.toRadians(to.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    return 2 * earthRadiusMiles * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private toRadians(value: number): number {
    return (value * Math.PI) / 180;
  }
}