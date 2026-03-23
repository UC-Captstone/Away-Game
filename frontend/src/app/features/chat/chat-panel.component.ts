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
import { Subscription } from 'rxjs';
import { ChatService } from './services/chat.service';
import { IChatMessage } from './models/chat';
import { AuthService } from '../auth/services/auth.service';
import { ChatMessageItemComponent } from './components/chat-message-item/chat-message-item.component';
import { ChatTypingBarComponent } from './components/chat-typing-bar/chat-typing-bar.component';
import { FriendsService } from '../../shared/services/friends.service';
import { PopupModalComponent } from '../../shared/components/popup-modal/popup-modal.component';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  standalone: true,
  imports: [CommonModule, ChatMessageItemComponent, ChatTypingBarComponent, PopupModalComponent],
})
export class ChatPanelComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {
  @Input() eventId: string = '';
  @Input() gameId: number | undefined = undefined;

  @ViewChild('messageList') private messageList!: ElementRef<HTMLElement>;

  messages: IChatMessage[] = [];
  sendError: string | null = null;
  loading = false;
  sending = false;
  deletingId: string | null = null;
  currentUserId: string | null = null;

  friendRequestTarget: { userId: string; userName: string } | null = null;
  friendRequestStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  friendRequestMessage: string = '';

  private shouldScrollToBottom = false;
  private subs = new Subscription();

  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
    private readonly friendsService: FriendsService,
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
      const alreadyActive = this.chatService.isActiveFor(this.eventId);
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
    this.chatService.pausePolling();
  }

  onSend(text: string): void {
    if (!text || this.sending) return;

    this.sending = true;
    this.shouldScrollToBottom = true;
    this.chatService.sendMessage(text).finally(() => {
      this.sending = false;
    });
  }

  onDelete(messageId: string): void {
    if (this.deletingId) return;
    this.deletingId = messageId;
    this.chatService.deleteMessage(messageId).finally(() => {
      this.deletingId = null;
    });
  }

  onAvatarClick(event: { userId: string; userName: string }): void {
    if (!event.userId || event.userId === this.currentUserId) return;
    this.friendRequestTarget = event;
    this.friendRequestStatus = 'idle';
    this.friendRequestMessage = '';
  }

  confirmFriendRequest(): void {
    if (!this.friendRequestTarget) return;
    const target = this.friendRequestTarget;
    this.friendRequestStatus = 'loading';
    this.subs.add(
      this.friendsService.sendFriendRequest(target.userId).subscribe({
        next: () => {
          this.friendRequestStatus = 'success';
          this.friendRequestMessage = `Friend request sent to ${target.userName}!`;
        },
        error: (err) => {
          this.friendRequestStatus = 'error';
          if (err.status === 409) {
            this.friendRequestMessage = `You're already friends or have a pending request with ${target.userName}.`;
          } else {
            this.friendRequestMessage = `Failed to send a friend request to ${target.userName}.`;
          }
        },
      }),
    );
  }

  closeFriendRequestModal(): void {
    this.friendRequestTarget = null;
    this.friendRequestStatus = 'idle';
    this.friendRequestMessage = '';
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
