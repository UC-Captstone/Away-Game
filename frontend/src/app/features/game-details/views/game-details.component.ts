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

          this.gameDetailsService.getGameEvents(game).subscribe((events) => {
            this.gameEvents.set(events);
          });

          this.gameDetailsService.getSafetyAlerts(game).subscribe((alerts) => {
            this.safetyAlerts.set(alerts);
          });

          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
    });
  }

  onAddEventClicked(): void {
    console.log('Add Event clicked');
  }

  onAddSafetyAlertClicked(): void {
    console.log('Add Safety Alert clicked');
  }
}
