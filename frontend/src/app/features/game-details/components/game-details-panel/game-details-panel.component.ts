import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { EventTileComponent } from '../../../../shared/components/event-tile/event-tile.component';
import { SafetyAlertTileComponent } from '../../../../shared/components/safety-alert-tile/safety-alert-tile.component';
import { GameChatPanelComponent } from '../game-chat-panel/game-chat-panel.component';
import { ISafetyAlert } from '../../../../shared/models/safety-alert';
import { IEvent } from '../../../../shared/models/event';

type GameDetailsTab = 'Events' | 'SafetyAlerts' | 'Chat';

@Component({
	selector: 'app-game-details-panel',
	templateUrl: './game-details-panel.component.html',
	standalone: true,
	imports: [CommonModule, EventTileComponent, SafetyAlertTileComponent, GameChatPanelComponent],
  host: {
    class: 'block h-full min-h-0',
  },
})
export class GameDetailsPanelComponent {
  @Input() eventId: string = '';
  @Input() gameId: number | undefined = undefined;
  @Input() gameEvents: IEvent[] = [];
  @Input() safetyAlerts: ISafetyAlert[] = [];

  @Output() addEventClicked = new EventEmitter<void>();
  @Output() addSafetyAlertClicked = new EventEmitter<void>();

  selectedTab: WritableSignal<GameDetailsTab> = signal('Events');

  onTabChange(tab: GameDetailsTab): void {
    this.selectedTab.set(tab);
  }

  onAddEventClicked(): void {
    this.addEventClicked.emit();
  }

  onAddSafetyAlertClicked(): void {
    this.addSafetyAlertClicked.emit();
  }
}
