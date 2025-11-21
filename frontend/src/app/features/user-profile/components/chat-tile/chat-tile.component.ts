import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IChatMessage } from '../../../community/models/chat-message';

@Component({
  selector: 'app-chat-tile',
  templateUrl: './chat-tile.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ChatTileComponent {
  @Input() chat!: IChatMessage;

  navigateToChat(event: Event) {
    event.preventDefault();
    // Nathan: Wire up router navigation when the chat route is ready
    console.log('Navigating to chat for team:', this.chat.teamID, 'chat:', this.chat.chatID);
  }
}
