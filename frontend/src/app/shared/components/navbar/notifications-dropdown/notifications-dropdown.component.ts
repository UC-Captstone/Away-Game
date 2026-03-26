import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IDMNotification } from '../../../models/dm-notification';
import { ISafetyAlert } from '../../../models/safety-alert';

@Component({
  selector: 'app-notifications-dropdown',
  templateUrl: './notifications-dropdown.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class NotificationsDropdownComponent {
  @Input() unacknowledgedCount = 0;
  @Input() dmNotifications: IDMNotification[] = [];
  @Input() unacknowledgedAlerts: ISafetyAlert[] = [];
  @Input() getRelativeTime: (dateString: string) => string = () => '';

  @Output() closeBell = new EventEmitter<void>();
  @Output() dmNotificationClick = new EventEmitter<IDMNotification>();
  @Output() acknowledgeOfficial = new EventEmitter<string>();
  @Output() viewAllMessages = new EventEmitter<void>();

  onAlertHistoryClick(): void {
    this.closeBell.emit();
  }
}
