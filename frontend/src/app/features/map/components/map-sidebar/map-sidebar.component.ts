import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from '../../../../shared/models/event';

@Component({
  selector: 'app-map-sidebar',
  templateUrl: './map-sidebar.component.html',
  standalone: true,
  imports: [CommonModule, DatePipe],
  host: {
    class: 'block h-full min-h-0',
  },
})
export class MapSidebarComponent {
  @Input() visibleEvents: IEvent[] = [];
  @Output() openEventDetails = new EventEmitter<IEvent>();

  onOpenEventDetails(event: IEvent): void {
    this.openEventDetails.emit(event);
  }
}
