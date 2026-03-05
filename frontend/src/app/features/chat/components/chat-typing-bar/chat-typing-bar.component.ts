import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-typing-bar',
  templateUrl: './chat-typing-bar.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ChatTypingBarComponent {
  @Input() sending = false;

  @Output() sendClicked = new EventEmitter<string>();

  messageText = '';

  onSend(): void {
    const text = this.messageText.trim();
    if (!text || this.sending) return;

    this.sendClicked.emit(text);
    this.messageText = '';
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }
}
