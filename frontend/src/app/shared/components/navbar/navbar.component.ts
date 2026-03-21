import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, OnDestroy, Output, WritableSignal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ClerkService } from '@jsrob/ngx-clerk';
import { Subscription, timer } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AuthService } from '../../../features/auth/services/auth.service';
import { AdminService } from '../../../features/admin/services/admin.service';
import { INavBar } from '../../models/navbar';
import { UserService } from '../../services/user.service';
import { SafetyAlertService } from '../../services/safety-alert.service';
import { ISafetyAlert } from '../../models/safety-alert';

const ALERT_POLL_INTERVAL_MS = 30_000;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class NavBarComponent implements OnDestroy {
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  navBarInfo: INavBar | null = null;
  isMenuOpen: WritableSignal<boolean> = signal(false);
  unacknowledgedAlerts: WritableSignal<ISafetyAlert[]> = signal([]);
  isBellOpen: WritableSignal<boolean> = signal(false);

  private navBarLoaded = false;
  private alertPollTimer: ReturnType<typeof setInterval> | null = null;
  private pendingPollSub: Subscription | null = null;
  private readonly PENDING_POLL_INTERVAL_MS = 60_000;
  private readonly PENDING_ALERT_ID = '__pending_approvals__';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private adminService: AdminService,
    private clerkService: ClerkService,
    private safetyAlertService: SafetyAlertService,
    private router: Router,
  ) {
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
      this.alertPollTimer = setInterval(() => this.loadUnacknowledgedAlerts(), ALERT_POLL_INTERVAL_MS);
    });
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get unacknowledgedCount(): number {
    return this.unacknowledgedAlerts().length;
  }

  loadUnacknowledgedAlerts(): void {
    this.safetyAlertService.getUnacknowledgedAlerts().subscribe({
      next: (alerts) => this.unacknowledgedAlerts.set(alerts),
      error: () => this.unacknowledgedAlerts.set([]),
    });
  }

  onBellClick(): void {
    const wasOpen = this.isBellOpen();
    this.isBellOpen.set(!wasOpen);

    if (wasOpen && this.unacknowledgedAlerts().some(a => !a.isOfficial)) {
      this.safetyAlertService.acknowledgeAll().subscribe({
        next: () => {
          this.unacknowledgedAlerts.set(this.unacknowledgedAlerts().filter(a => a.isOfficial));
        },
        error: () => { /* silently ignore */ },
      });
    }
  }

  onAcknowledgeOfficial(alertId: string): void {
    this.safetyAlertService.acknowledgeAlert(alertId).subscribe({
      next: () => {
        this.unacknowledgedAlerts.set(
          this.unacknowledgedAlerts().filter(a => a.alertId !== alertId)
        );
      },
      error: () => { /* silently ignore */ },
    });
  }

  closeBell(): void {
    this.isBellOpen.set(false);
    if (this.unacknowledgedAlerts().some(a => !a.isOfficial)) {
      this.safetyAlertService.acknowledgeAll().subscribe({
        next: () => {
          this.unacknowledgedAlerts.set(this.unacknowledgedAlerts().filter(a => a.isOfficial));
        },
        error: () => { /* silently ignore */ },
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
        const others = this.unacknowledgedAlerts().filter(a => a.alertId !== this.PENDING_ALERT_ID);
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

  async onSignOut(): Promise<void> {
    try {
      this.authService.clearInternalToken();
      await this.clerkService.clerk()?.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      this.authService.clearInternalToken();
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    if (this.alertPollTimer) {
      clearInterval(this.alertPollTimer);
    }
    this.pendingPollSub?.unsubscribe();
  }
}
