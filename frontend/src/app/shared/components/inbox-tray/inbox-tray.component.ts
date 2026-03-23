import { Component, OnInit, OnDestroy, signal, WritableSignal, ElementRef, HostListener } from '@angular/core';
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
  template: `
    <div class="relative">
      <!-- Inbox Button -->
      <button
        (click)="toggleOpen()"
        class="relative p-2 md:p-2.5 text-slate-300 hover:text-slate-100 transition-colors rounded-lg hover:bg-slate-700/50"
        title="Direct Messages"
      >
        <!-- Mail Icon -->
        <svg
          class="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <!-- Notification Badge -->
        @if (unreadCount() > 0) {
          <div
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-slate-900 animate-pulse"
          >
            {{ unreadCount() }}
          </div>
        }
      </button>

      <!-- Dropdown Panel -->
      @if (isOpen()) {
        <div
          class="absolute right-0 mt-2 w-80 max-w-[calc(100vw-1rem)] bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-50"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div class="p-3 md:p-4 border-b border-slate-700 bg-slate-750">
            <h3 class="text-base md:text-lg font-semibold text-slate-100 flex items-center gap-2">
              <span>💬</span> Messages
            </h3>
          </div>

          <!-- Conversations List -->
          <div class="max-h-96 overflow-y-auto">
            @if (loading()) {
              <div class="p-6 text-center">
                <div class="flex justify-center mb-2">
                  <div class="animate-spin h-5 w-5 border-2 border-sky-500 border-t-transparent rounded-full"></div>
                </div>
                <p class="text-slate-400 text-sm">Loading conversations...</p>
              </div>
            } @else if (conversations().length === 0) {
              <div class="p-6 text-center text-slate-400">
                <p class="text-3xl mb-2">💭</p>
                <p class="text-sm">No conversations yet</p>
              </div>
            } @else {
              @for (conv of conversations(); track conv.otherUserId) {
                <button
                  (click)="onSelectConversation(conv)"
                  class="w-full p-3 md:p-4 border-b border-slate-700 hover:bg-slate-700/70 transition-colors text-left active:bg-slate-700 group"
                >
                  <div class="flex gap-3">
                    @if (conv.otherAvatarUrl) {
                      <img
                        [src]="conv.otherAvatarUrl"
                        [alt]="conv.otherUsername"
                        class="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                    } @else {
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex-shrink-0"></div>
                    }
                    <div class="flex-1 min-w-0 flex flex-col justify-between">
                      <div class="flex items-start justify-between gap-2">
                        <div class="font-medium text-slate-100 truncate text-sm md:text-base">
                          {{ conv.otherUsername }}
                        </div>
                        @if (conv.lastMessageTime) {
                          <div class="text-xs text-slate-400 flex-shrink-0">
                            {{ getRelativeTime(conv.lastMessageTime) }}
                          </div>
                        }
                      </div>
                      <div class="text-xs md:text-sm text-slate-300 truncate opacity-75 group-hover:opacity-100 transition-opacity">
                        {{ conv.lastMessage || 'No messages yet' }}
                      </div>
                    </div>
                  </div>
                </button>
              }
            }
          </div>

          <!-- Footer Link -->
          <div class="p-3 md:p-4 border-t border-slate-700 bg-slate-750">
            <a
              href="/community"
              (click)="onViewAll()"
              class="text-sm text-sky-400 hover:text-sky-300 font-medium inline-flex items-center gap-1 transition-colors"
            >
              View all messages
              <span>→</span>
            </a>
          </div>
        </div>
      }
    </div>
  `,
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
