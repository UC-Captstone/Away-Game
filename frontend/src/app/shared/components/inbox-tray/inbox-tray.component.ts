import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  WritableSignal,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FriendsService } from '../../../shared/services/friends.service';
import { IConversationPreview } from '../../../shared/models/direct-message';
import { IFriendship } from '../../../shared/models/friends';

@Component({
  selector: 'app-inbox-tray',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inbox-tray.component.html',
  host: {
    class: 'block',
  },
})
export class InboxTrayComponent implements OnInit, OnDestroy {
  isOpen: WritableSignal<boolean> = signal(false);
  conversations: WritableSignal<IConversationPreview[]> = signal([]);
  unreadCount: WritableSignal<number> = signal(0);
  loading: WritableSignal<boolean> = signal(true);

  private subs = new Subscription();
  private refreshInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private friendsService: FriendsService,
    private elementRef: ElementRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadConversations();
    // Refresh every 5 seconds when panel is open
    this.setupAutoRefresh();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  toggleOpen(): void {
    this.isOpen.set(!this.isOpen());
    if (this.isOpen()) {
      this.loadConversations();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  onSelectConversation(conv: IConversationPreview): void {
    this.router.navigate(['/community'], { queryParams: { friend: conv.otherUserId } });
    this.isOpen.set(false);
  }

  onViewAll(): void {
    this.isOpen.set(false);
  }

  getRelativeTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  }

  private loadConversations(): void {
    this.loading.set(true);
    // Load friends and fetch last message for each
    this.subs.add(
      this.friendsService.getFriends().subscribe({
        next: (friends) => {
          if (friends.length === 0) {
            this.conversations.set([]);
            this.loading.set(false);
            return;
          }

          // Fetch last message for each friend in parallel
          const lastMessageRequests = friends.map((f) =>
            this.friendsService.getLastMessage(f.friendUserId).pipe(
              map((messages) => {
                const lastMsg = messages.length > 0 ? messages[0] : null;
                return {
                  otherUserId: f.friendUserId,
                  otherUsername: f.friendUsername,
                  otherAvatarUrl: f.friendAvatarUrl,
                  lastMessage: lastMsg?.messageText || 'No messages yet',
                  lastMessageTime: lastMsg?.createdAt || '',
                  unreadCount: 0,
                } as IConversationPreview;
              }),
              catchError(() => {
                // If fetching last message fails, show conversation without it
                return of({
                  otherUserId: f.friendUserId,
                  otherUsername: f.friendUsername,
                  otherAvatarUrl: f.friendAvatarUrl,
                  lastMessage: 'No messages yet',
                  lastMessageTime: '',
                  unreadCount: 0,
                } as IConversationPreview);
              }),
            ),
          );

          this.subs.add(
            forkJoin(lastMessageRequests).subscribe({
              next: (previews) => {
                // Sort by most recent message first
                previews.sort((a, b) => {
                  const aTime = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0;
                  const bTime = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0;
                  return bTime - aTime;
                });
                this.conversations.set(previews);
                this.loading.set(false);
              },
              error: (err) => {
                console.error('Error loading last messages:', err);
                this.loading.set(false);
              },
            }),
          );
        },
        error: (err) => {
          console.error('Error loading conversations:', err);
          this.loading.set(false);
        },
      }),
    );
  }

  private setupAutoRefresh(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.refreshInterval = setInterval(() => {
      if (this.isOpen()) {
        this.loadConversations();
      }
    }, 5000);
  }
}
