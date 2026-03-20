import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsHeaderComponent } from '../../../shared/components/details-header/details-header.component';
import { ISafetyAlert } from '../../../shared/models/safety-alert';
import { GameDetailsPanelComponent } from '../components/game-details-panel/game-details-panel.component';
import { GameMapPanelComponent } from '../components/game-map-panel/game-map-panel.component';
import { GameDetailsService } from '../services/game-details.service';
import { IEvent } from '../../../shared/models/event';

@Component({
	selector: 'app-game-details',
	templateUrl: './game-details.component.html',
	standalone: true,
	imports: [CommonModule, DetailsHeaderComponent, GameDetailsPanelComponent, GameMapPanelComponent],
})
export class GameDetailsComponent implements OnInit {
  isLoading: WritableSignal<boolean> = signal(false);

  gameEvents: WritableSignal<IEvent[]> = signal([]);
  safetyAlerts: WritableSignal<ISafetyAlert[]> = signal([]);
  game: WritableSignal<IEvent | null> = signal(null);
  /** Canonical event_id for the chat channel (resolved via game-channel endpoint for game events). */
  chatEventId: WritableSignal<string> = signal('');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly gameDetailsService: GameDetailsService,
  ) {}

  ngOnInit(): void {
    this.isLoading.set(true);
    this.route.queryParamMap.subscribe((params) => {
      this.gameDetailsService.getGameFromQuery(params).subscribe({
        next: (game) => {
          this.game.set(game);

          if (game.gameId) {
            this._afterGameIdResolved(game);
          } else if (game.eventId) {
            // gameId missing from URL — recover it from the backend using the eventId
            this.gameDetailsService.getGameIdByEventId(game.eventId).subscribe((gameId) => {
              if (gameId) {
                const patched = { ...game, gameId };
                this.game.set(patched);
                this._afterGameIdResolved(patched);
              } else {
                this._afterGameIdResolved(game);
              }
              this.isLoading.set(false);
            });
            return;
          } else {
            this._afterGameIdResolved(game);
          }

          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
    });
  }

  private _afterGameIdResolved(game: IEvent): void {
    if (game.gameId) {
      this.gameDetailsService.getGameChatEventId(game.gameId).subscribe({
        next: (id) => this.chatEventId.set(id),
        error: () => this.chatEventId.set(game.eventId),
      });
    } else {
      this.chatEventId.set(game.eventId);
    }

    this.gameDetailsService.getGameEvents(game).subscribe((events) => {
      this.gameEvents.set(events);
    });

    this.gameDetailsService.getSafetyAlerts(game).subscribe((alerts) => {
      this.safetyAlerts.set(alerts);
    });
  }

  onAddEventClicked(): void {
    console.log('Add Event clicked');
  }

  onAlertsChanged(): void {
    const currentGame = this.game();
    if (currentGame) {
      this.gameDetailsService.getSafetyAlerts(currentGame).subscribe((alerts) => {
        this.safetyAlerts.set(alerts);
      });
    }
  }
}
