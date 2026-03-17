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
  template: `
    @if (otherUserId && otherUsername; as user) {
      <div class="h-full flex flex-col bg-slate-900">
        <!-- Header -->
        <div class="border-b border-slate-700 p-3 md:p-4 flex items-center gap-3 bg-slate-800 sticky top-0">
          @if (otherAvatarUrl) {
            <img
              [src]="otherAvatarUrl"
              [alt]="otherUsername"
              class="w-10 h-10 rounded-full object-cover"
            />
          } @else {
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex-shrink-0"></div>
          }
          <div class="flex-1 min-w-0">
            <h2 class="text-base md:text-lg font-semibold text-slate-100 truncate">{{ otherUsername }}</h2>
            <p class="text-xs text-slate-400">Direct message</p>
          </div>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3 flex flex-col" #messageList>
          @if (loading()) {
            <div class="flex items-center justify-center h-full text-slate-400">
              <div class="flex flex-col items-center gap-2">
                <div class="animate-spin h-5 w-5 border-2 border-sky-500 border-t-transparent rounded-full"></div>
                <span class="text-sm">Loading messages...</span>
              </div>
            </div>
          } @else if (messages().length === 0) {
            <div class="flex items-center justify-center h-full text-slate-400">
              <div class="text-center">
                <p class="text-sm mb-1">No messages yet</p>
                <p class="text-xs">Start the conversation!</p>
              </div>
            </div>
          } @else {
            @for (msg of messages(); track msg.messageId) {
              @if (msg.isDeleted) {
                <div class="flex justify-center my-1">
                  <div class="text-xs text-slate-500 italic">[Message deleted]</div>
                </div>
              } @else {
                <div
                  [class.justify-end]="msg.senderId === currentUserId"
                  [class.justify-start]="msg.senderId !== currentUserId"
                  class="flex group mb-1"
                >
                  <div
                    [class.bg-sky-600]="msg.senderId === currentUserId"
                    [class.bg-slate-700]="msg.senderId !== currentUserId"
                    [class.rounded-br-none]="msg.senderId === currentUserId"
                    [class.rounded-bl-none]="msg.senderId !== currentUserId"
                    [class.max-w-xs]="true"
                    [class.max-w-sm]="true"
                    class="text-slate-100 p-2 md:p-3 rounded-lg relative break-words"
                  >
                    <p class="text-sm whitespace-pre-wrap">{{ msg.messageText }}</p>
                    <div class="text-xs text-slate-300 mt-1 opacity-70">
                      {{ msg.createdAt | date: 'short' }}
                    </div>

                    <!-- Delete button (only for own messages) -->
                    @if (msg.senderId === currentUserId) {
                      <button
                        (click)="onDeleteMessage(msg.messageId)"
                        [disabled]="deletingId() === msg.messageId"
                        title="Delete message"
                        class="absolute -right-6 md:-right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 text-xs font-medium"
                      >
                        ✕
                      </button>
                    }
                  </div>
                </div>
              }
            }
          }
        </div>

        <!-- Input -->
        <div class="border-t border-slate-700 p-3 md:p-4 bg-slate-800 sticky bottom-0">
          @if (error()) {
            <div class="mb-2 text-red-400 text-sm px-2 py-1 bg-red-950/30 rounded">{{ error() }}</div>
          }
          <div class="flex gap-2">
            <input
              [(ngModel)]="messageInput"
              (keyup.enter)="onSendMessage()"
              placeholder="Type a message..."
              [disabled]="sending()"
              class="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:opacity-50 text-sm"
            />
            <button
              (click)="onSendMessage()"
              [disabled]="!messageInput.trim() || sending()"
              title="Send message"
              class="bg-sky-600 hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-3 md:px-4 py-2 rounded font-medium text-sm transition-colors"
            >
              @if (sending()) {
                <span class="inline-block animate-spin">⟳</span>
              } @else {
                <span>Send</span>
              }
            </button>
          </div>
        </div>
      </div>
    } @else {
      <div class="h-full flex items-center justify-center text-slate-400">
        <div class="text-center">
          <p class="text-lg mb-2">📱</p>
          <p class="text-sm">Select a friend to start messaging</p>
        </div>
      </div>
    }
  `,

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
