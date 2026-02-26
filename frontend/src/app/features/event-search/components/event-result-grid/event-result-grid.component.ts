import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EventTileComponent } from '../../../../shared/components/event-tile/event-tile.component';
import { IEvent } from '../../../../shared/models/event';

@Component({
  selector: 'app-event-result-grid',
  templateUrl: './event-result-grid.component.html',
  standalone: true,
  imports: [CommonModule, EventTileComponent],
})
export class EventResultGridComponent {
  @Input() events: IEvent[] = [];
}
