import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { IEvent } from '../../../events/models/event';
import { EventTileComponent } from '../../../../shared/components/event-tile/event-tile.component';
import { SafetyAlertTileComponent } from '../../../../shared/components/safety-alert-tile/safety-alert-tile.component';
import { ISafetyAlert } from '../../../../shared/models/safety-alert';

type GameDetailsTab = 'Events' | 'SafetyAlerts';

@Component({
	selector: 'app-game-details-panel',
	templateUrl: './game-details-panel.component.html',
	standalone: true,
	imports: [CommonModule, EventTileComponent, SafetyAlertTileComponent],
  host: {
    class: 'block h-full min-h-0',
  },
})
export class GameDetailsPanelComponent {
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
