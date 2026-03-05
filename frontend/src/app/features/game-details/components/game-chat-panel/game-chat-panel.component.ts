import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../chat/services/chat.service';
import { IChatMessage } from '../../../chat/models/chat';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-game-chat-panel',
  templateUrl: './game-chat-panel.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class GameChatPanelComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {
  @Input() eventId: string = '';
  @Input() gameId: number | undefined = undefined;

  @ViewChild('messageList') private messageList!: ElementRef<HTMLElement>;

  messages: IChatMessage[] = [];
  messageText = '';
  sendError: string | null = null;
  loading = false;
  sending = false;
  deletingId: string | null = null;
  currentUserId: string | null = null;

  private shouldScrollToBottom = false;
  private subs = new Subscription();

  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.subs.add(
      this.chatService.messages$.subscribe((msgs) => {
        const wasAtBottom = this.isNearBottom();
        this.messages = msgs;
        if (wasAtBottom) {
          this.shouldScrollToBottom = true;
        }
      }),
    );
    this.subs.add(this.chatService.sendError$.subscribe((err) => (this.sendError = err)));
    this.subs.add(this.chatService.loading$.subscribe((l) => (this.loading = l)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventId'] && this.eventId) {
      // If it's the same event (user switched back to Chat tab), just resume
      // polling from where it left off — no reload needed.
      const alreadyActive = (this.chatService as unknown as { currentEventId: string | null }).currentEventId === this.eventId;
      if (alreadyActive) {
        this.chatService.resumePolling();
      } else {
        this.chatService.initForEvent(this.eventId, this.gameId);
      }
      this.shouldScrollToBottom = true;
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    // Pause (don't destroy) so messages and cursor are preserved when the user
    // switches back to this tab.
    this.chatService.pausePolling();
  }

  onSend(): void {
    const text = this.messageText.trim();
    if (!text || this.sending) return;

    this.sending = true;
    this.shouldScrollToBottom = true;
    this.chatService
      .sendMessage(text)
      .then(() => {
        this.messageText = '';
      })
      .finally(() => {
        this.sending = false;
      });
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
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
    // Timestamps from the backend are always UTC. If the string has no
    // timezone suffix (no 'Z' or '+'), append 'Z' so the browser parses
    // it as UTC instead of local time.
    const utc =
      timestamp.endsWith('Z') || /[+-]\d{2}:?\d{2}$/.test(timestamp)
        ? timestamp
        : timestamp + 'Z';
    return new Date(utc).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  onDelete(messageId: string): void {
    if (this.deletingId) return;
    this.deletingId = messageId;
    this.chatService
      .deleteMessage(messageId)
      .finally(() => {
        this.deletingId = null;
      });
  }

  private isNearBottom(): boolean {
    const el = this.messageList?.nativeElement;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop <= el.clientHeight + 80;
  }

  private scrollToBottom(): void {
    const el = this.messageList?.nativeElement;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }
}
