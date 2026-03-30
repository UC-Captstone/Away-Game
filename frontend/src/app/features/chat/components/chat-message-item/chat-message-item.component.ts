import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChatMessage } from '../../models/chat';

@Component({
  selector: 'app-chat-message-item',
  templateUrl: './chat-message-item.component.html',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'block w-full',
  },
})
export class ChatMessageItemComponent {
  @Input() message!: IChatMessage;
  @Input() currentUserId: string | null = null;
  @Input() deleting = false;

  @Output() deleteClicked = new EventEmitter<string>();
  @Output() avatarClicked = new EventEmitter<{ userId: string; userName: string }>();

  onDelete(): void {
    this.deleteClicked.emit(this.message.messageId);
  }

  get isOwnMessage(): boolean {
    return this.message?.userId === this.currentUserId;
  }

  onAvatarClick(): void {
    if (this.message.userId && this.message.userId !== this.currentUserId) {
      this.avatarClicked.emit({
        userId: this.message.userId,
        userName: this.message.userName || 'Anonymous',
      });
    }
  }

  getInitials(name: string | null): string {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  formatTime(timestamp: string): string {
    const utc =
      timestamp.endsWith('Z') || /[+-]\d{2}:?\d{2}$/.test(timestamp) ? timestamp : timestamp + 'Z';
    return new Date(utc).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
