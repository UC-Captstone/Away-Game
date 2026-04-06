import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { EventTileComponent } from '../../../../shared/components/event-tile/event-tile.component';
import { SafetyAlertTileComponent } from '../../../../shared/components/safety-alert-tile/safety-alert-tile.component';
import { ChatPanelComponent } from '../../../chat/chat-panel.component';
import { ISafetyAlert } from '../../../../shared/models/safety-alert';
import { IEvent } from '../../../../shared/models/event';
import { AuthService } from '../../../auth/services/auth.service';

type GameDetailsTab = 'Events' | 'SafetyAlerts' | 'Chat';

@Component({
  selector: 'app-game-details-panel',
  templateUrl: './game-details-panel.component.html',
  standalone: true,
  imports: [CommonModule, EventTileComponent, SafetyAlertTileComponent, ChatPanelComponent],
  host: {
    class: 'block h-full min-h-0',
  },
})
export class GameDetailsPanelComponent implements OnChanges {
  @Input() eventId: string = '';
  @Input() gameId: number | undefined = undefined;
  @Input() gameEvents: IEvent[] = [];
  @Input() safetyAlerts: ISafetyAlert[] = [];

  @Output() addEventClicked = new EventEmitter<void>();
  @Output() addAlertClicked = new EventEmitter<void>();

  selectedTab: WritableSignal<GameDetailsTab> = signal('Events');
  displayedGameEvents: IEvent[] = [];

  isAdmin: boolean;
  canCreateAlert: boolean;

  constructor(private authService: AuthService) {
    this.isAdmin = authService.isAdmin();
    const role = authService.getUserRole();
    this.canCreateAlert = this.isAdmin || role === 'verified_creator';
  }

  onTabChange(tab: GameDetailsTab): void {
    this.selectedTab.set(tab);
  }

  onAddEventClicked(): void {
    this.addEventClicked.emit();
  }

  onAddAlertClicked(): void {
    this.addAlertClicked.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gameEvents']) {
      const nextEvents: IEvent[] = changes['gameEvents'].currentValue ?? [];
      this.displayedGameEvents = [...nextEvents];
    }

    // Auto-switch to Alerts tab when alerts first arrive and user hasn't manually switched tabs
    if (changes['safetyAlerts'] && changes['safetyAlerts'].firstChange === false) {
      const alerts: ISafetyAlert[] = changes['safetyAlerts'].currentValue ?? [];
      if (alerts.length > 0 && this.selectedTab() === 'Events') {
        this.selectedTab.set('SafetyAlerts');
      }
    }
  }

  get sortedAlerts(): ISafetyAlert[] {
    return [...this.safetyAlerts].sort((a, b) => {
      if (a.isOfficial === b.isOfficial) return 0;
      return a.isOfficial ? -1 : 1;
    });
  }
}
