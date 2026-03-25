import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FriendsService } from '../../../shared/services/friends.service';
import { AuthService } from '../../auth/services/auth.service';
import { IDirectMessage } from '../../../shared/models/direct-message';

@Component({
  selector: 'app-dm-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dm-chat.component.html',
  host: {
    class: 'block h-full min-h-0',
  },
})
export class DMChatComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {
  @Input() otherUserId: string | null = null;
  @Input() otherUsername: string = '';
  @Input() otherAvatarUrl: string | null = null;
  @Output() backClicked = new EventEmitter<void>();
  @ViewChild('messageList') private messageList!: ElementRef<HTMLElement>;

  messages: WritableSignal<IDirectMessage[]> = signal([]);
  loading: WritableSignal<boolean> = signal(false);
  sending: WritableSignal<boolean> = signal(false);
  error: WritableSignal<string> = signal('');
  deletingId: WritableSignal<string | null> = signal(null);
  currentUserId: string | null = null;
  messageInput: string = '';

  private subs = new Subscription();
  private shouldScrollToBottom = false;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private conversationSignature = '';
  private isRefreshing = false;

  constructor(
    private friendsService: FriendsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['otherUserId'] && this.otherUserId) {
      this.conversationSignature = '';
      this.refreshMessages(true);
      this.startPolling();
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
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  private refreshMessages(showLoading = false): void {
    if (!this.otherUserId) return;
    if (this.isRefreshing) return;
    this.isRefreshing = true;
    if (showLoading) {
      this.loading.set(true);
      this.error.set('');
      this.messages.set([]);
    }

    this.subs.add(
      this.friendsService.getConversation(this.otherUserId, 50).subscribe({
        next: (msgs) => {
          const signature = JSON.stringify(
            msgs.map((m) => [m.messageId, m.updatedAt, m.createdAt, m.isDeleted, m.messageText]),
          );

          if (showLoading || signature !== this.conversationSignature) {
            const nearBottom = this.isNearBottom();
            this.messages.set(msgs);
            this.conversationSignature = signature;
            if (nearBottom || showLoading) {
              this.shouldScrollToBottom = true;
            }
          }

          this.loading.set(false);
          this.isRefreshing = false;
        },
        error: (err) => {
          console.error('Error loading messages:', err);
          if (showLoading) {
            this.error.set('Failed to load messages');
          }
          this.loading.set(false);
          this.isRefreshing = false;
        },
      }),
    );
  }

  private startPolling(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }

    this.pollTimer = setInterval(() => {
      if (!this.otherUserId || document.hidden) return;
      this.refreshMessages(false);
    }, 5000);
  }

  onSendMessage(): void {
    if (!this.messageInput.trim() || !this.otherUserId || this.sending()) return;

    const text = this.messageInput.trim();
    this.messageInput = '';
    this.sending.set(true);
    this.error.set('');

    this.subs.add(
      this.friendsService.sendDirectMessage(this.otherUserId, text).subscribe({
        next: (msg) => {
          const next = [...this.messages(), msg];
          this.messages.set(next);
          this.conversationSignature = JSON.stringify(
            next.map((m) => [m.messageId, m.updatedAt, m.createdAt, m.isDeleted, m.messageText]),
          );
          this.sending.set(false);
          this.shouldScrollToBottom = true;
        },
        error: (err) => {
          this.error.set(err.error?.detail || 'Failed to send message');
          this.messageInput = text; // Restore text
          this.sending.set(false);
        },
      }),
    );
  }

  onDeleteMessage(messageId: string): void {
    this.deletingId.set(messageId);
    this.subs.add(
      this.friendsService.deleteDirectMessage(messageId).subscribe({
        next: () => {
          const next = this.messages().map((m) =>
            m.messageId === messageId ? { ...m, isDeleted: true, messageText: '' } : m,
          );
          this.messages.set(next);
          this.conversationSignature = JSON.stringify(
            next.map((m) => [m.messageId, m.updatedAt, m.createdAt, m.isDeleted, m.messageText]),
          );
          this.deletingId.set(null);
        },
        error: (err) => {
          console.error('Error deleting message:', err);
          this.deletingId.set(null);
        },
      }),
    );
  }

  private scrollToBottom(): void {
    try {
      this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  private isNearBottom(): boolean {
    const el = this.messageList?.nativeElement;
    if (!el) return true;
    const threshold = 100;
    return el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  }
}
