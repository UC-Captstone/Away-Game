import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  EventEmitter,
  OnDestroy,
  Output,
  WritableSignal,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ClerkService } from '@jsrob/ngx-clerk';
import { catchError, EMPTY, forkJoin, map, of, Subscription, timer } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../features/auth/services/auth.service';
import { AdminService } from '../../../features/admin/services/admin.service';
import { NotificationBellButtonComponent } from './notification-bell-button/notification-bell-button.component';
import { NotificationsDropdownComponent } from './notifications-dropdown/notifications-dropdown.component';
import { IDMNotification } from '../../models/dm-notification';
import { INavBar } from '../../models/navbar';
import { UserService } from '../../services/user.service';
import { SafetyAlertService } from '../../services/safety-alert.service';
import { ISafetyAlert } from '../../models/safety-alert';
import { FriendsService } from '../../services/friends.service';
import { IDirectMessage } from '../../models/direct-message';

const POLL_INTERVAL_MS = 30_000;
const DM_SEEN_STORAGE_KEY = 'away-game:dm-seen-at-by-friend';
const DM_BASELINE_INITIALIZED_KEY = 'away-game:dm-baseline-initialized';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    NotificationBellButtonComponent,
    NotificationsDropdownComponent,
  ],
})
export class NavBarComponent implements OnDestroy {
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  navBarInfo: INavBar | null = null;
  isMenuOpen: WritableSignal<boolean> = signal(false);
  unacknowledgedAlerts: WritableSignal<ISafetyAlert[]> = signal([]);
  dmNotifications: WritableSignal<IDMNotification[]> = signal([]);
  isBellOpen: WritableSignal<boolean> = signal(false);
  readonly relativeTimeFormatter = (dateString: string): string => this.getRelativeTime(dateString);

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  private navBarLoaded = false;
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private pendingPollSub: Subscription | null = null;
  private routerEventsSub: Subscription | null = null;
  private readonly PENDING_POLL_INTERVAL_MS = 60_000;
  private readonly PENDING_ALERT_ID = '__pending_approvals__';
  private dmSeenAtByFriend: Record<string, string> = {};
  private readonly onProfilePictureUpdated = (event: Event) => {
    const customEvent = event as CustomEvent<{ profilePictureUrl: string | null }>;
    if (!this.navBarInfo) {
      return;
    }
    this.navBarInfo = {
      ...this.navBarInfo,
      profilePictureUrl: customEvent.detail?.profilePictureUrl || undefined,
    };
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private adminService: AdminService,
    private clerkService: ClerkService,
    private safetyAlertService: SafetyAlertService,
    private friendsService: FriendsService,
    private router: Router,
  ) {
    this.dmSeenAtByFriend = this.getStoredDmSeenMap();
    window.addEventListener('away-game:profile-picture-updated', this.onProfilePictureUpdated);

    effect(() => {
      const clerk = this.clerkService.clerk();
      const isSignedIn = !!clerk?.session;

      if (!isSignedIn || this.navBarLoaded) return;

      this.navBarLoaded = true;
      this.isLoading.emit(true);

      this.userService.getNavBarInfo().subscribe({
        next: (navBarInfo: INavBar) => {
          this.navBarInfo = navBarInfo;
          this.isLoading.emit(false);
          if (this.authService.isAdmin()) {
            this.startPendingPoll();
          }
        },
        error: (error) => {
          console.error('Error fetching navbar info:', error);
          this.isLoading.emit(false);
        },
      });

      this.loadUnacknowledgedAlerts();
      this.loadDmNotifications();
      this.pollTimer = setInterval(() => {
        this.loadUnacknowledgedAlerts();
        this.loadDmNotifications();
      }, POLL_INTERVAL_MS);
    });

    this.routerEventsSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenu();
        this.isBellOpen.set(false);
      });
  }

  get unacknowledgedCount(): number {
    return this.unacknowledgedAlerts().length + this.dmNotifications().length;
  }

  loadUnacknowledgedAlerts(): void {
    this.safetyAlertService.getUnacknowledgedAlerts().subscribe({
      next: (alerts) => this.unacknowledgedAlerts.set(alerts),
      error: () => this.unacknowledgedAlerts.set([]),
    });
  }

  loadDmNotifications(): void {
    this.friendsService.getFriends().subscribe({
      next: (friends) => {
        if (friends.length === 0) {
          this.dmNotifications.set([]);
          return;
        }

        const requests = friends.map((friend) =>
          this.friendsService.getLastMessage(friend.friendUserId).pipe(
            map((messages) => this.buildDmNotification(friend, messages[0] ?? null)),
            catchError(() => of(null)),
          ),
        );

        forkJoin(requests).subscribe({
          next: (results) => {
            const incomingLatest = results.filter((item): item is IDMNotification => item !== null);

            if (!this.isDmBaselineInitialized()) {
              incomingLatest.forEach((item) => {
                if (item.lastMessageTime) {
                  this.dmSeenAtByFriend[item.otherUserId] = item.lastMessageTime;
                }
              });
              this.persistDmSeenMap();
              this.markDmBaselineInitialized();
              this.dmNotifications.set([]);
              return;
            }

            const unseen = incomingLatest
              .filter((item) => this.isDmUnseen(item.otherUserId, item.lastMessageTime || ''))
              .sort((a, b) => {
                const aTime = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0;
                const bTime = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0;
                return bTime - aTime;
              });

            this.dmNotifications.set(unseen);
          },
          error: () => {
            this.dmNotifications.set([]);
          },
        });
      },
      error: () => {
        this.dmNotifications.set([]);
      },
    });
  }

  onDmNotificationClick(item: IDMNotification): void {
    if (item.lastMessageTime) {
      this.dmSeenAtByFriend[item.otherUserId] = item.lastMessageTime;
      this.persistDmSeenMap();
    }

    this.dmNotifications.set(
      this.dmNotifications().filter((dm) => dm.otherUserId !== item.otherUserId),
    );
    this.isBellOpen.set(false);
    this.router.navigate(['/community'], { queryParams: { friend: item.otherUserId } });
  }

  onViewAllMessages(): void {
    this.dmNotifications().forEach((item) => {
      if (item.lastMessageTime) {
        this.dmSeenAtByFriend[item.otherUserId] = item.lastMessageTime;
      }
    });
    this.persistDmSeenMap();
    this.dmNotifications.set([]);
    this.isBellOpen.set(false);
    this.router.navigate(['/community']);
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

  onBellClick(): void {
    const wasOpen = this.isBellOpen();
    this.isBellOpen.set(!wasOpen);

    // When closing: auto-ack all non-official alerts (user has had a chance to read them)
    if (wasOpen && this.unacknowledgedAlerts().some((a) => !a.isOfficial)) {
      this.safetyAlertService.acknowledgeAll().subscribe({
        next: () => {
          this.unacknowledgedAlerts.set(this.unacknowledgedAlerts().filter((a) => a.isOfficial));
        },
        error: () => {
          /* silently ignore */
        },
      });
    }
  }

  onAcknowledgeOfficial(alertId: string): void {
    this.safetyAlertService.acknowledgeAlert(alertId).subscribe({
      next: () => {
        this.unacknowledgedAlerts.set(
          this.unacknowledgedAlerts().filter((a) => a.alertId !== alertId),
        );
      },
      error: () => {
        /* silently ignore */
      },
    });
  }

  closeBell(): void {
    this.isBellOpen.set(false);
    // Auto-ack non-official alerts when closing via backdrop click
    if (this.unacknowledgedAlerts().some((a) => !a.isOfficial)) {
      this.safetyAlertService.acknowledgeAll().subscribe({
        next: () => {
          this.unacknowledgedAlerts.set(this.unacknowledgedAlerts().filter((a) => a.isOfficial));
        },
        error: () => {
          /* silently ignore */
        },
      });
    }
  }

  private startPendingPoll(): void {
    this.pendingPollSub = timer(0, this.PENDING_POLL_INTERVAL_MS)
      .pipe(
        switchMap(() =>
          this.adminService.getPendingApprovals().pipe(catchError(() => EMPTY)),
        ),
      )
      .subscribe((users) => {
        const others = this.unacknowledgedAlerts().filter((a) => a.alertId !== this.PENDING_ALERT_ID);
        if (users.length > 0) {
          const pendingAlert: ISafetyAlert = {
            alertId: this.PENDING_ALERT_ID,
            reporterUserId: '',
            alertTypeId: 'admin',
            title: `${users.length} pending verification request${users.length === 1 ? '' : 's'}`,
            description: 'Review and approve or deny in Admin Settings.',
            source: 'admin',
            severity: 'medium',
            isActive: true,
            isOfficial: true,
            createdAt: new Date().toISOString(),
          };
          this.unacknowledgedAlerts.set([pendingAlert, ...others]);
        } else {
          this.unacknowledgedAlerts.set(others);
        }
      });
  }

  private buildDmNotification(
    friend: { friendUserId: string; friendUsername: string; friendAvatarUrl?: string | null },
    lastMessage: IDirectMessage | null,
  ): IDMNotification | null {
    if (!lastMessage) {
      return null;
    }

    const isIncoming = lastMessage.senderId === friend.friendUserId;
    if (!isIncoming || !lastMessage.createdAt) {
      return null;
    }

    return {
      otherUserId: friend.friendUserId,
      otherUsername: friend.friendUsername,
      otherAvatarUrl: friend.friendAvatarUrl,
      lastMessage: lastMessage.messageText || 'Sent a message',
      lastMessageTime: lastMessage.createdAt,
      unreadCount: 1,
      lastMessageId: lastMessage.messageId,
    };
  }

  private isDmUnseen(friendUserId: string, messageTime: string): boolean {
    if (!messageTime) {
      return false;
    }

    const seenAt = this.dmSeenAtByFriend[friendUserId];
    if (!seenAt) {
      return true;
    }

    return new Date(messageTime).getTime() > new Date(seenAt).getTime();
  }

  private getStoredDmSeenMap(): Record<string, string> {
    try {
      const raw = localStorage.getItem(this.dmSeenStorageKey());
      if (!raw) {
        return {};
      }

      const parsed = JSON.parse(raw) as Record<string, string>;
      return parsed ?? {};
    } catch {
      return {};
    }
  }

  private persistDmSeenMap(): void {
    try {
      localStorage.setItem(this.dmSeenStorageKey(), JSON.stringify(this.dmSeenAtByFriend));
    } catch {
      // Ignore localStorage write errors.
    }
  }

  private isDmBaselineInitialized(): boolean {
    try {
      return localStorage.getItem(this.dmBaselineStorageKey()) === '1';
    } catch {
      return false;
    }
  }

  private markDmBaselineInitialized(): void {
    try {
      localStorage.setItem(this.dmBaselineStorageKey(), '1');
    } catch {
      // Ignore localStorage write errors.
    }
  }

  private dmSeenStorageKey(): string {
    const userId = this.authService.getCurrentUserId() || 'anonymous';
    return `${DM_SEEN_STORAGE_KEY}:${userId}`;
  }

  private dmBaselineStorageKey(): string {
    const userId = this.authService.getCurrentUserId() || 'anonymous';
    return `${DM_BASELINE_INITIALIZED_KEY}:${userId}`;
  }

  async onSignOut(): Promise<void> {
    try {
      await this.authService.clearInternalToken();
      await this.clerkService.clerk()?.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      await this.authService.clearInternalToken();
      this.closeMenu();
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }
    this.pendingPollSub?.unsubscribe();
    this.routerEventsSub?.unsubscribe();
    window.removeEventListener('away-game:profile-picture-updated', this.onProfilePictureUpdated);
  }
}
