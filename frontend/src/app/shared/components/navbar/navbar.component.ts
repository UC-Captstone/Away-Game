import { CommonModule } from '@angular/common';
import { Component, effect, EventEmitter, OnDestroy, Output, WritableSignal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ClerkService } from '@jsrob/ngx-clerk';
import { AuthService } from '../../../features/auth/services/auth.service';
import { INavBar } from '../../models/navbar';
import { UserService } from '../../services/user.service';
import { SafetyAlertService } from '../../services/safety-alert.service';
import { ISafetyAlert } from '../../models/safety-alert';

const POLL_INTERVAL_MS = 30_000;

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
  isAdmin = false;

  private navBarLoaded = false;
  private pollTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
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
      this.isAdmin = this.authService.isAdmin();

      this.userService.getNavBarInfo().subscribe({
        next: (navBarInfo: INavBar) => {
          this.navBarInfo = navBarInfo;
          this.isLoading.emit(false);
        },
        error: (error) => {
          console.error('Error fetching navbar info:', error);
          this.isLoading.emit(false);
        },
      });

      this.loadUnacknowledgedAlerts();
      this.pollTimer = setInterval(() => this.loadUnacknowledgedAlerts(), POLL_INTERVAL_MS);
    });
  }

  ngOnDestroy(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
    }
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

    // When closing: auto-ack all non-official alerts (user has had a chance to read them)
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
    // Auto-ack non-official alerts when closing via backdrop click
    if (this.unacknowledgedAlerts().some(a => !a.isOfficial)) {
      this.safetyAlertService.acknowledgeAll().subscribe({
        next: () => {
          this.unacknowledgedAlerts.set(this.unacknowledgedAlerts().filter(a => a.isOfficial));
        },
        error: () => { /* silently ignore */ },
      });
    }
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
}
