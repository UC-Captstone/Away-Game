import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-bell-button',
  templateUrl: './notification-bell-button.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class NotificationBellButtonComponent {
  @Input() unacknowledgedCount = 0;
  @Output() bellClick = new EventEmitter<void>();

  onBellClick(): void {
    this.bellClick.emit();
  }
}
